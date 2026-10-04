const { Resend } = require("resend");

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const sendCustomerAutoReply = async ({
  customerEmail,
  customerName,
}) => {
  if (!customerEmail) {
    throw new Error(
      "Customer email address is required."
    );
  }

  const name = customerName || "there";

  const { data, error } =
    await resend.emails.send({
      from: "CHOPHOUSE <onboarding@resend.dev>",
      to: [customerEmail],
      subject:
        "We received your message — CHOPHOUSE",
      html: `
        <div style="
          margin: 0;
          padding: 40px 20px;
          background: #f7f1e5;
          font-family: Arial, sans-serif;
          color: #1c1c18;
        ">
          <div style="
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
          ">

            <div style="
              padding: 32px;
              background: #12372a;
              color: #ffffff;
            ">
              <p style="
                margin: 0 0 8px;
                font-size: 12px;
                font-weight: bold;
                letter-spacing: 2px;
              ">
                CHOPHOUSE
              </p>

              <h1 style="
                margin: 0;
                font-size: 28px;
              ">
                The Taste of Nigeria
              </h1>
            </div>

            <div style="padding: 32px;">

              <p style="
                font-size: 17px;
                margin-top: 0;
              ">
                Hello ${name} 👋
              </p>

              <p style="
                font-size: 15px;
                line-height: 1.7;
              ">
                Thank you for contacting
                CHOPHOUSE.
              </p>

              <p style="
                font-size: 15px;
                line-height: 1.7;
              ">
                We've received your message
                and our team will get back to
                you as soon as possible.
              </p>

              <div style="
                margin: 28px 0;
                padding: 20px;
                background: #f7f1e5;
                border-left: 4px solid #c65d2e;
              ">
                <strong>
                  CHOPHOUSE
                </strong>

                <p style="
                  margin: 8px 0 0;
                  font-size: 14px;
                  line-height: 1.6;
                ">
                  Fresh Nigerian meals,
                  made with flavour,
                  tradition and care.
                </p>
              </div>

              <p style="
                font-size: 15px;
                line-height: 1.7;
              ">
                Thank you for choosing
                CHOPHOUSE.
              </p>

              <p style="
                margin-bottom: 0;
                font-size: 15px;
                line-height: 1.7;
              ">
                Warm regards,<br />
                <strong>
                  CHOPHOUSE Team
                </strong>
              </p>

            </div>

            <div style="
              padding: 20px 32px;
              background: #eee5d4;
              font-size: 12px;
              color: #6e6a61;
            ">
              CHOPHOUSE — The Taste of Nigeria
            </div>

          </div>
        </div>
      `,
    });

  if (error) {
    console.error(
      "Resend email error:",
      error
    );

    throw new Error(
      "Unable to send customer email."
    );
  }

  return data;
};

module.exports = {
  sendCustomerAutoReply,
};