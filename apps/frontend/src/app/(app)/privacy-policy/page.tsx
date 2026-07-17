export const dynamic = 'force-dynamic';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - 2Stallions',
  description: 'Privacy Policy',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white px-[20px] py-[60px]">
      <div className="max-w-[720px] mx-auto flex flex-col gap-[20px]">
        <h1 className="text-[32px] font-[500]">Privacy Policy</h1>
        <p className="text-[14px] opacity-70">Last updated: July 2026</p>

        <p>
          This Privacy Policy explains how 2Stallions Pte. Ltd.
          (&quot;2Stallions&quot;, &quot;we&quot;, &quot;us&quot;), located
          at The Gateway West, Level 35, 150 Beach Road, Singapore 189720,
          collects, uses, and protects data through this Service - a
          social media scheduling and publishing platform built on Postiz,
          used by 2Stallions to manage content across social media
          platforms, including LinkedIn (personal profiles and company
          pages), Instagram, Facebook (business pages), YouTube, and
          TikTok, on behalf of its own accounts and its clients&apos;
          accounts.
        </p>

        <h2 className="text-[20px] font-[500] mt-[12px]">1. Information we collect</h2>
        <ul className="list-disc pl-[24px] flex flex-col gap-[6px]">
          <li>
            <strong>Account information:</strong> name and email address for
            users we invite to the Service.
          </li>
          <li>
            <strong>Connected platform data:</strong> when you connect a
            social media account (e.g. LinkedIn, Instagram, Facebook,
            YouTube, TikTok), we store the
            OAuth access and refresh tokens issued by that platform, and
            basic public profile information needed to identify the
            connected account, such as display name and profile picture.
          </li>
          <li>
            <strong>Content:</strong> text, images, and video you upload or
            create through the Service for scheduling and publishing.
          </li>
        </ul>

        <h2 className="text-[20px] font-[500] mt-[12px]">2. Platform data and permissions</h2>
        <p>
          When you connect a LinkedIn account, we request permissions via
          LinkedIn&apos;s official OAuth flow to identify the connected
          profile or company page and to create and manage posts on it at
          your direction. When you connect an Instagram account or a
          Facebook business page, we request permissions via Meta&apos;s
          Graph API to identify the connected page or account and to
          publish and manage the content you schedule. When you connect a
          YouTube channel, we request permissions via Google OAuth to
          identify the channel and to upload and manage the videos you
          schedule. Our use of information received from Google APIs
          adheres to the{' '}
          <a
            className="underline"
            href="https://developers.google.com/terms/api-services-user-data-policy"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>
        <p>
          When you connect a TikTok account, we request the following
          permissions through TikTok Login Kit:
        </p>
        <ul className="list-disc pl-[24px] flex flex-col gap-[6px]">
          <li>
            <strong>user.info.basic</strong>,{' '}
            <strong>user.info.profile</strong> - to display your connected
            TikTok account&apos;s name and avatar within the Service.
          </li>
          <li>
            <strong>video.publish</strong>, <strong>video.upload</strong> -
            to publish and manage video posts you schedule through the
            Service.
          </li>
        </ul>
        <p>
          Across all platforms, we only access connected-account data to
          perform the scheduling and publishing actions you request. We do
          not use connected-platform data for advertising, and we do not
          sell it to any third party.
        </p>

        <h2 className="text-[20px] font-[500] mt-[12px]">3. How we use information</h2>
        <p>
          We use the information above solely to operate the Service:
          authenticating your connected accounts, scheduling and publishing
          content at your direction, and showing basic performance
          analytics retrieved from the connected platform&apos;s own API.
        </p>

        <h2 className="text-[20px] font-[500] mt-[12px]">4. Data sharing</h2>
        <p>
          We do not sell or rent your data. We share data with a connected
          platform (e.g. LinkedIn, Instagram, Facebook, YouTube, TikTok)
          only as strictly necessary to
          carry out the action you requested, such as publishing a
          scheduled post, using that platform&apos;s own official API.
        </p>

        <h2 className="text-[20px] font-[500] mt-[12px]">5. Data retention</h2>
        <p>
          We retain connected-account tokens and content for as long as the
          account remains connected to the Service, or until you request
          deletion. Disconnecting an account revokes our access and we stop
          retrieving further data for it.
        </p>

        <h2 className="text-[20px] font-[500] mt-[12px]">6. Data storage and security</h2>
        <p>
          Data is stored in a private database associated with this
          deployment, hosted on Railway, and is not publicly accessible. We
          take reasonable technical and organizational measures to protect
          it, though no method of electronic storage or transmission is
          completely secure.
        </p>

        <h2 className="text-[20px] font-[500] mt-[12px]">7. Your rights</h2>
        <p>
          You may disconnect a connected account at any time from within
          the Service, or revoke our access directly from that
          platform&apos;s own connected-apps settings (e.g. LinkedIn
          Settings &gt; Data privacy &gt; Permitted services; Facebook and
          Instagram Settings &gt; Apps and websites; Google Account &gt;
          Security &gt; Third-party access; TikTok Settings and Privacy
          &gt; Security and permissions &gt; Manage third-party
          permissions). You may request access to, or deletion of, your
          data by contacting us using the details below.
        </p>

        <h2 className="text-[20px] font-[500] mt-[12px]">8. Children&apos;s privacy</h2>
        <p>
          The Service is intended for use by 2Stallions staff and adult
          clients only, and is not directed at children. We do not
          knowingly collect data from individuals under 18.
        </p>

        <h2 className="text-[20px] font-[500] mt-[12px]">9. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Continued
          use of the Service after changes take effect constitutes
          acceptance of the updated policy.
        </p>

        <h2 className="text-[20px] font-[500] mt-[12px]">10. Contact</h2>
        <p>
          Questions about this policy, or requests to access or delete your
          data, can be sent to{' '}
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
