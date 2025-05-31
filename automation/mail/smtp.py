import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def send_email_with_html(sender_email: str, app_password: str, recipient_email: str, subject: str, html_content: str):
    """
    Sends an email with HTML content via Gmail's SMTP server using an app password.

    Args:
        sender_email (str): The sender's Gmail address.
        app_password (str): The Gmail app password generated for your account.
                            (Go to Google Account -> Security -> App passwords)
        recipient_email (str): The recipient's email address.
        subject (str): The subject of the email.
        html_content (str): The HTML content of the email body.
    """
    try:
        # Create a multipart message and set headers
        message = MIMEMultipart("alternative")
        message["From"] = sender_email
        message["To"] = recipient_email
        message["Subject"] = subject

        # Attach HTML content
        part1 = MIMEText(html_content, "html")
        message.attach(part1)

        # Connect to Gmail's SMTP server
        # For Gmail, the SMTP server is smtp.gmail.com and the port is 587 (TLS)
        with smtplib.SMTP("live.smtp.mailtrap.io", 587) as server:
            server.starttls()  # Upgrade the connection to a secure encrypted SSL/TLS connection
            server.login("smtp@mailtrap.io", app_password)  # Log in to the SMTP server
            server.sendmail(sender_email, recipient_email, message.as_string()) # Send the email
        print("Email sent successfully!")

    except Exception as e:
        print(f"Error sending email: {e}")
