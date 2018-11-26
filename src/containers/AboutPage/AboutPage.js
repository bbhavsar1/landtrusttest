import React from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';

import css from './AboutPage.css';
import image from './about-us-1056.jpg';

const AboutPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About LandTrust',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Who we are</h1>
          <img className={css.coverImage} src={image} alt="outdoors" />

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p></p>
            </div>

            <div className={css.contentMain}>
              <h2>
                Ownership
              </h2>

              <p>
              Private land ownership is a cornerstone principle of the American dream 
              and one which we strongly support. We believe that by working with 
              conservation-minded Landowners and responsible Sportsmen we’ll be able 
              to build sustainable model to ensure conservation through the use of 
              private lands.
              </p>

              <h3 className={css.subtitle}>Landowners</h3>

              <p>
              LandTrust can’t exist without conservation-minded Landowners who 
              believe that entrusting responsible Sportsmen with harvesting fish and
              game from their land is essential to preserving fish, game, and the 
              rich history of the American outdoorsman. If you’re a Landowner that 
              fits that bill, whether you own 5 acres or 500,000 acres, we’d enjoy 
              having you join our website. We’re in the process of launching and if 
              you register we’ll also be seeking your guidance along the way as we 
              build this company.
              </p>

              <h2>Our Team</h2>
              <h3 className={css.subtitle}>Nic De Castro</h3>

              <p>
              Nic is a sales leader in the marketing technology industry with a 
              breadth of experience both building businesses and selling products to 
              the largest advertisers on the planet. He's lived in Boston, LA, 
              Chicago, NYC, SF, Boulder, and Bozeman and has nearly broken 1M miles 
              for work travel, but has been fortunate to sneak quite a bit of fun 
              into those miles over the years. Nic grew up bird hunting and fishing 
              in Southern California from a very young age. His love for the outdoors 
              has led him to Montana where he's pursuing his passion for hunting and 
              fishing as well as building businesses that feed his lifestyle.
              </p>

              <h3 className={css.subtitle}>Aaron Ricchio</h3>

              <p>
              Aaron is a beach kid at heart who found himself in NYC in order to 
              further his design career. While working at some of the largest 
              agencies he ironically landed a position creating with Cabela's. 
              This sparked a number of relationships and fun times with the outdoor 
              retailer. Now, after over twelve years in one of the least outdoor 
              places he's begun working on his hunting and fishing skills. If he's 
              not creating ads, branding or logos, you can typically find him at 
              the airport headed off to his next climbing related adventure with 
              his badass wife.
              </p>
            </div>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default AboutPage;
