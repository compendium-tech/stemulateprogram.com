import csv
import os
import time
from dotenv import load_dotenv
from smtp import send_email_with_html

# Load environment variables
load_dotenv()

# Configuration from environment variables
CONFIG = {
    "SENDER_EMAIL": os.getenv("SENDER_EMAIL"),
    "APP_PASSWORD": os.getenv("APP_PASSWORD"),
    "EMAIL_SUBJECT": os.getenv("EMAIL_SUBJECT", "Important Update: STEMulate Program"),
    "THROTTLE_SECONDS": int(os.getenv("THROTTLE_SECONDS", 10)),
}

# Validate required configuration
for key in ["SENDER_EMAIL", "APP_PASSWORD"]:
    if not CONFIG[key]:
        raise ValueError(f"Missing required environment variable: {key}")

def generate_email_content(first_name: str) -> str:
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Important Update: STEMulate Program</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        /* Basic Reset & Body Styles */
        body {{
            margin: 0;
            padding: 0;
            background-color: #f4f4f4 !important; /* Light grey background for email client compatibility */
            color: #333333 !important; /* Darker text for readability */
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            line-height: 1.6;
        }}

        /* Table and Container Styles */
        .email-container {{
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Softer, more prominent shadow */
            -webkit-font-smoothing: antialiased;
        }}

        .header-section {{
            background-color: #DB0C0C; /* Dark Red */
            padding: 25px 30px;
            text-align: left;
            color: #ffffff; /* White text for header */
        }}

        .content-section {{
            padding: 30px; /* This padding gives space from the white box edges */
            color: #333333;
        }}

        .footer-section {{
            background-color: #f0f0f0; /* Light grey footer */
            padding: 20px 30px;
            text-align: center;
            font-size: 12px;
            color: #777777;
        }}

        /* Image Styles */
        .logo {{
            max-width: 180px; /* Slightly larger logo */
            height: auto;
            display: block;
            margin: 0; /* Remove all margins to hug the corner of its container */
            padding-bottom: 10px; /* Add some space below the logo */
        }}

        /* Text Styles */
        h2, h3 {{
            color: #DB0C0C; /* Red headings for emphasis */
            margin-top: 1.5em;
            margin-bottom: 0.8em;
            font-weight: 600;
        }}

        p {{
            margin: 0 0 1em 0;
        }}

        .date {{
            text-align: right;
            font-size: 14px;
            color: #555555;
            margin-bottom: 20px;
        }}

        .recipient {{
            text-align: left;
            font-size: 14px;
            color: #555555;
            margin-bottom: 20px;
        }}

        .signature {{
            margin-top: 30px;
            font-weight: 600; /* Slightly bolder */
            color: #333333;
        }}

        a {{
            color: #DB0C0C; /* Link color */
            text-decoration: none; /* No underline by default */
        }}

        a:hover {{
            text-decoration: underline; /* Underline on hover for links */
        }}

        ul {{
            list-style-type: disc;
            padding-left: 20px;
            margin-bottom: 1em;
        }}

        li {{
            margin-bottom: 0.5em;
        }}

        /* Responsive Styles */
        @media only screen and (max-width: 600px) {{
            .email-container {{
                width: 100% !important;
                margin: 0 auto !important;
                border-radius: 0;
            }}
            .content-section {{
                padding: 20px !important;
            }}
            .header-section {{
                padding: 20px !important;
            }}
            .logo {{
                max-width: 150px;
            }}
        }}
    </style>
</head>
<body>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
            <td align="center">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="email-container">
                    <tr>
                        <td class="header-section">
                            </td>
                    </tr>
                    <tr>
                        <td class="content-section">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="text-align: left; padding-bottom: 15px;">
                                        <img src="https://stemulateprogram.com/logo2.png" width="140" alt="STEMulate Logo" class="logo">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: right;">
                                        <p class="date">June 1, 2025</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Dear {first_name},</p>
                                        <p>Thank you for registering for the <b>STEMulate Information Session</b>.<br />
We’re excited to meet you and share more about our research program and scholarship opportunities.</p>
                                        <p><b>Date</b>: June 6 <br />
<b>Time</b>: 10:00 AM (UTC-4, New York time) <br />
<b>Zoom link</b>: https://us02web.zoom.us/j/4326519591</p>
                                        <hr />
                                        <p><b style="color:red;">Please convert the time to your local timezone for convenience.</b></p>
                                        <p>We look forward to seeing you there!</p>
                                        <p>Please don't hesitate to reach out to us at <a href="mailto:admissions@stemulateprogram.com" style="color: #DB0C0C; text-decoration: none;">admissions@stemulateprogram.com</a>.</p>
                                        <p class="signature">Best regards, <br>STEMulate Admissions Team</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td class="footer-section">
                            <p>&copy; 2025 STEMulate Program. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
"""


def load_recipient_list() -> dict[str, str]:
    email_to_first_name = {}

    with open('events.csv', mode='r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            email = row['Invitee Email'].strip()
            first_name = row['Invitee First Name'].strip()
            if email:
                email_to_first_name[email] = first_name

    return email_to_first_name


def main():
    """Main execution flow."""
    recipients = load_recipient_list()

    for email, first_name in recipients.items():
        try:
            print(f"Sending to {email} ({first_name})")
            html_content = generate_email_content(first_name)
            send_email_with_html(CONFIG["SENDER_EMAIL"], CONFIG["APP_PASSWORD"], email, CONFIG["EMAIL_SUBJECT"], html_content)
        except Exception as e:
            print(f"Failed to process {email}: {str(e)}")

if __name__ == "__main__":
    main()
