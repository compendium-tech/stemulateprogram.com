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

def generate_email_content() -> str:
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
                                        <p class="date">May 30, 2025</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>We’re excited to invite you to an upcoming <b style="color: red;">STEMulate online info session on Friday, June 6, 2025 at 10:00 AM (GMT-4)</b>. Please make sure to convert the time to your local time zone to avoid any confusion.</p>

<p><b>Register here</b>: https://calendly.com/stemulate-program/info-sessions.</p>

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

    emails = "vikablablablac@gmail.com ttnrrmarina@mail.ru stasyashikina29@gmail.com toshpolatovbehruz864@gmail.com aibat.abzal@mail.ru altairsapar10@gmail.com solihatakhirovna@gmail.com zayniddinovfazliddin690@gmail.com ergashevf1909@gmail.com sakshisushil7f@gmail.com rayxonabektosheva@gmail.com narkulovashahrizoda@gmail.com kassenova.amina13@gmail.com nurjakhanrustamov@gmail.com shahzodaesojonova@gmail.com malikamusinjonova7@gmail.com abdulloh.axi@icloud.com orlpierro@libero.it ulugbek.ibodullayev.123@gmail.com astermeee@gmail.com s.komiljonov@newuu.uz sherqulovayulduz06@email.com boburxolmirzayev44@gmail.com yuduzmee06@email.com alua_yermekova@icloud.com nurillayevadilnura86@gmail.com kamila.maulen25@fizmat.kz kamila.maulen27@gmail.com hyragamer00@gmail.com akkountdls05@gmail.com supieva_d0904@fmalm.nis.edu.kz shaillinarai@gmail.com t.mesh.2000@gmail.com asseltnmgrv@gmail.com asilasalohiddinova85@gmail.com islombekibragimov228@gmail.com nadialiberty123@gmail.com tesukokitzuko@gmail.com altynbekmejrhan124@gmail.com meirkhanaltynbek2@gmail.com t.zebizar@gmail.com icysunhe2016@hotmail.com asemay.ibragimova@gmail.com ibragimova.asemay@gmail.com karkynzanerke03@gmail.com yeskendirthebest@gmail.com bakdanazenysbek@gmail.com dilshodaanorboyeva222@gmail.com balausaabylhanova@gmail.com kaesiet@gmail.com muslimapmstudent@gmail.com eclipwzegirly@gmail.com uzbek48085@gmail.com azizaralbaeva@gmail.com zacksara893@gmail.com makazanalpamys@gmail.com kamola7678653456893@gmail.com almira2008.ab@gmail.com ruzahunovalatifa@gmail.com 369zhuldyz@gmail.com zebinisoprezident@gmail.com zilolashodmonova34@gmail.com tleukindias@gmail.com zuxrakhozhamuratova@gmail.com simorangkirkenny@gmail.com azatkyzy09@bk.ru abylaikhanzhumagul@gmail.com h79977676@gmail.com o.djoldasov@nukuspm.uz shahrizodamosajonova@gmail.com parizodabekbayeva772@gmail.com disastrous.moonlover@gmail.com maftunasadullayeva457@gmail.com yasminazarifova2@gmail.com zhibekmelsy@gmail.com xadichabehimjammalidinova@gmail.com famousa088@gmail.com bur.liza207@gmail.com amalissabek@gmail.com javohirkomilov111@gmail.com sevinch77771111@gmail.com kttybajzanserik@gmail.com ashier.grizzly-5e@icloud.com tohirovarayhona0427@gmail.com aruzhannurgazy44@gmail.com karimx498@gmail.com amjadsadia169@gmail.com ersultanibraimov44@gmail.com dilnuramatkarimova56@gmail.com muslimanematova287@gmailcom muslimanematova287@gmail.com assylay.toleubay@gmail.com akalaevadiana06@gmail.com mahmetovasofia@gmail.com ersulcool@gmail.com duisengaliersultan8@gmail.com rafaildilara@icloud.com pesflix033@gmail.com positiveexotic123@gmail.com alish260307@gmail.com mohira091@gmail.com meodema@mail.ru khaynana70@gmail.com mshuinshalina@gmail.com ecnmst1@gmail.com yelgezekova07@bk.ru azhara22@mail.ru sevinchbaratova0204@gmail.com jahonaxonu@gmail.com indiratabaeva252@gmail.com sarvarakuyliboyeva30@gmail.com nura23042009@gmail.com poyonovmurodullo22@gmail.com norboyevbekhruz07@gmail.com bulekbayevalikhan@gmail.com abdumutalovrustam51@gmail.com fotimatogayeva817@gmail.com you.sunshine.29@gmail.com xislatumarov97@gmail.com xudoyanoksana1225@gmeil.com xudoyanoksana1225@gmail.com tairural777@gmail.com xasanov.b1993@gmail.com sevinchgolibjonovna05@gmail.com yersultanmels.e@gmail.com saulcb235@gmail.com xasanovashs7786@gmail.com abdusalommm36@gmail.com sevinchotamurodova21@gmail.com aslbekasatillayev716@gmail.com abdukodirovaparizoda80@gmail.com adilbaevashahi@gmail.com zhanabayaliya@gmail.com zafarovanodira2@gmail.com damir.salybekov.07@gmail.com ismatullayevadurdona46@gmail.com bakbergenovarislan@gmail.com ruxshona24062008@gmail.com gulsevarboboyorova181@gmail.com nurdek98@gmail.com rasul.mirgaly@gmail.com azamatakmyrzaev0@gmail.com marsbekkanikey@gmail.com odinabonuanvarova2509@gmail.com medetkyzysaida@gmail.com asiya.marat09@gmail.com aizhamal.mrtv@gmail.com asselyesbolgan@gmail.com akobirisakov6@gmail.com nika.zeynep@yandex.ru daryndaryn981@gmail.com turgunboyevdostonbek21@gmail.com jasminasobirdjanova@gmail.com usmonpirmatov08@gmail.com meirmanseitkali@gmail.com nazarovamohiinur@gmail.com jaloliddinfaxriddinov61@gmail.com j35819226@gmail.com sayatobashova123@gmail.com mavlonbekjamolov09@gmail.com robiabonum@gmail.com arlanzharasbekov10@gmail.com hadichaibrohimova@gmail.com aidanaabdrakhman8@gmail.com kurmanali18.05@gmail.com tlokiltoki@gmail.com ibrohimovahadicha189@gmail.com madaminovvip@gmail.com damelimussabekova@gmail.com yasmina.luna.2008@gmail.com azizaziyoqulova1308@gmail.com raskulovzhandos001@gmail.com akerke.sagyndykova26@fizmat.kz togayevazuhra70@gmail.com kamila.sailaukhanova@icloud.com numonovabdulloh09@gmail.com zoyirovmadatbek@gmail.com jamilovarushana08@gmail.com madaminovaruhshona6@gmail.com ruxshonaoralova71@gmail.com sadullarizayev@gmail.com lovelygirlmekhri@gmail.com tokmurzieva.banu@gmail.com hadichaabdumajidova@gmail.com 8blue.boymuratova.kh@gmail.com sardormuradov83@gmail.com s.alikhan101107@gmail.con krutoilerou@gmail.con krutoilerou@gmail.com kulmuradovanishangul99@gmail.com jb1061721@gmail.com f.urakova1978@gmail.com feruzaurakova728@gmail.com test@gmail.com test2@gmail.com muxamadaliyev.elyorbek@gmai.com veronikamoskalenkooo2@gmail.com mtojimuhammatova@mail.ru abdurahmonagzamovic@gmail.com wetxoz14@gmail.com alisherad1987@gmail.com sofia1xudaynazarova@gmail.com abishabdikalikov2@gmail.con abishabdikalikov2@gmail.com zulfiyaadirova@gmail.com khasanboevsanjarbek@gmail.com hadisaidyn@gmail.com kamshatzhumatay008@gmail.com ravshanovmuhammadbilol2@gmail.com asadbek.axi2@gmail.com".split()

    return [
        email.strip() for email in
        emails
        if '@' in email
    ]

def main():
    """Main execution flow."""
    recipients = load_recipient_list()

    for email in recipients:
        try:
            print(f"Sending to {email}")
            html_content = generate_email_content()
            send_email_with_html(CONFIG["SENDER_EMAIL"], CONFIG["APP_PASSWORD"], email, CONFIG["EMAIL_SUBJECT"], html_content)
            time.sleep(CONFIG["THROTTLE_SECONDS"])
        except Exception as e:
            print(f"Failed to process {email}: {str(e)}")

if __name__ == "__main__":
    main()
