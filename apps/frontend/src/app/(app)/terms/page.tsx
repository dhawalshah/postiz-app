export const dynamic = 'force-dynamic';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Postiz',
  description: 'Terms of Service',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white px-[20px] py-[60px]">
      <div className="max-w-[720px] mx-auto flex flex-col gap-[20px]">
        <h1 className="text-[32px] font-[500]">Terms of Service</h1>
        <p className="text-[14px] opacity-70">Last updated: July 2026</p>

        <p>
          This site (&quot;Service&quot;) is operated by 2Stallions Pte.
          Ltd. (&quot;2Stallions&quot;, &quot;we&quot;, &quot;us&quot;), a
          Singapore-registered digital marketing agency located at The
          Gateway West, Level 35, 150 Beach Road, Singapore 189720. The
          Service is a social media scheduling and publishing platform built
          on Postiz, an open-source scheduling tool, used by 2Stallions to
          plan, schedule, and publish content across social media platforms
          on behalf of its own accounts and its clients&apos; accounts. By
          accessing or using the Service, you agree to these Terms.
        </p>

        <h2 className="text-[20px] font-[500] mt-[12px]">1. Who can use the Service</h2>
        <p>
          Access to the Service is by invitation only, granted to
          2Stallions staff and authorized clients. It is not open for
          public self-signup. Users must be at least 18 years old and have
          the authority to manage the social media accounts they connect.
        </p>

        <h2 className="text-[20px] font-[500] mt-[12px]">2. Connecting third-party accounts</h2>
        <p>
          The Service lets you connect social media accounts, including
          TikTok and YouTube, using each platform&apos;s official OAuth
          login. For TikTok specifically, we request the following
          permissions via TikTok Login Kit:
        </p>
        <ul className="list-disc pl-[24px] flex flex-col gap-[6px]">
          <li>
            <strong>user.info.basic</strong> and{' '}
            <strong>user.info.profile</strong> - to identify the connected
            TikTok account (display name and avatar) within the Service.
          </li>
          <li>
            <strong>video.publish</strong> and{' '}
            <strong>video.upload</strong> - to publish and manage video
            content you create and schedule through the Service, at your
            direction.
          </li>
        </ul>
        <p>
          These permissions are used solely to operate the scheduling and
          publishing features you use. We do not post, edit, or delete
          content on your connected accounts except as you explicitly
          schedule or request through the Service.
        </p>

        <h2 className="text-[20px] font-[500] mt-[12px]">3. Your content</h2>
        <p>
          You retain ownership of all content you upload or create through
          the Service. You are responsible for ensuring content you
          schedule or publish complies with the applicable platform&apos;s
          own terms and community guidelines (e.g. TikTok&apos;s Terms of
          Service and Community Guidelines).
        </p>

        <h2 className="text-[20px] font-[500] mt-[12px]">4. Revoking access</h2>
        <p>
          You may disconnect any connected account from within the Service
          at any time, or revoke access directly from that platform&apos;s
          own connected-apps/authorized-apps settings. Revoking access
          stops the Service from taking any further action on that account.
        </p>

        <h2 className="text-[20px] font-[500] mt-[12px]">5. No warranty</h2>
        <p>
          The Service is provided on an &quot;as is&quot; basis. We make
          reasonable efforts to keep it available and secure but do not
          guarantee uninterrupted or error-free operation.
        </p>

        <h2 className="text-[20px] font-[500] mt-[12px]">6. Limitation of liability</h2>
        <p>
          To the extent permitted by law, 2Stallions is not liable for
          indirect, incidental, or consequential damages arising from use
          of the Service, including actions taken by connected third-party
          platforms.
        </p>

        <h2 className="text-[20px] font-[500] mt-[12px]">7. Governing law</h2>
        <p>These Terms are governed by the laws of Singapore.</p>

        <h2 className="text-[20px] font-[500] mt-[12px]">8. Changes to these Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of the
          Service after changes take effect constitutes acceptance of the
          updated Terms.
        </p>

        <h2 className="text-[20px] font-[500] mt-[12px]">9. Contact</h2>
        <p>
          Questions about these Terms can be sent to{' '}
          <a className="underline" href="mailto:info@2stallions.com">
            info@2stallions.com
          </a>
          , or by mail to The Gateway West, Level 35, 150 Beach Road,
          Singapore 189720.
        </p>
      </div>
    </div>
  );
}
