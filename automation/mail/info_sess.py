# This script sends an email to people registered in the STEMulate application portal.
# It reads the recipient list, and sends the emails with links to Calendly for
# info sessions.
# ------------------------------------------------------------------------------------
# Ensure you have the required environment variables set for email configuration:
# - SENDER_EMAIL: The email address from which the emails will be sent.
# - SMTP_PASSWORD: The api key for MailTrap.

import os
import time
from dotenv import load_dotenv
from smtp import send_email_with_html

# Load environment variables
load_dotenv()

# Configuration from environment variables
CONFIG = {
    "SENDER_EMAIL": os.getenv("SENDER_EMAIL"),
    "SMTP_PASSWORD": os.getenv("SMTP_PASSWORD"),
    "EMAIL_SUBJECT": os.getenv("EMAIL_SUBJECT", "Important Update: STEMulate Program"),
    "THROTTLE_SECONDS": int(os.getenv("THROTTLE_SECONDS", 10)),
}

# Validate required configuration
for key in ["SENDER_EMAIL", "SMTP_PASSWORD"]:
    if not CONFIG[key]:
        raise ValueError(f"Missing required environment variable: {key}")

def generate_email_content() -> str:
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
                                        <p>We’re excited to invite you to an upcoming <b style="color: red;">STEMulate online info session on Friday, June 6, 2025 at 10:00 AM (GMT-4)</b>. Please make sure to convert the time to your local time zone to avoid any confusion.</p>

<p><b>Register here</b>: <a href="https://calendly.com/stemulate-program/info-sessions" style="color: #DB0C0C; text-decoration: none;">https://calendly.com/stemulate-program/info-sessions</a>.</p>

<p>Info sessions are an essential part of the application process. During the session, you will receive detailed information about the program’s structure, research opportunities, academic expectations, and selection criteria.
We strongly encourage all prospective applicants to attend, as this is the best way to gain a comprehensive understanding of what the program offers and what we look for in candidates.</p>

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

def load_recipient_list() -> list:
    """Load and validate recipient emails."""

    return [
        email.strip() for email in
        ["test@gmail.com"] # list of emails can be extended or loaded from a file
        if '@' in email
    ]

def main():
    """Main execution flow."""
    recipients = load_recipient_list()

    for email in recipients:
        try:
            print(f"Sending to {email}")
            html_content = generate_email_content()
            send_email_with_html(CONFIG["SENDER_EMAIL"], CONFIG["SMTP_PASSWORD"], email, "Invitation to STEMulate information session", html_content)
        except Exception as e:
            print(f"Failed to process {email}: {str(e)}")

if __name__ == "__main__":
    main()
