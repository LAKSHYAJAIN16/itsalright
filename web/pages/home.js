import React, { useEffect, useState } from "react";
import Head from "next/head";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";
import Keys from "../keys.json";

export default function Home() {
  const [display2, setDisplay2] = useState(false);
  const [display3, setDisplay3] = useState(false);
  const [display4, setDisplay4] = useState(false);
  const [display5, setDisplay5] = useState(false);

  useEffect(() => {
    if (Keys.parallax === true) {
      //We Only want the effect on desktops
      var is_mobile =
        !!navigator.userAgent.match(/iphone|android|blackberry/gi) || false;
      if (is_mobile === false) {
        let x = 0;
        window.addEventListener("scroll", () => {
          x += 10;

          if (x > 30) {
            setDisplay2(true);
          }
          if (x >= 380) {
            setDisplay3(true);
          }

          if (x >= 700) {
            setDisplay4(true);
          }

          if (x >= 1000) {
            setDisplay5(true);
          }
        });
      } else if (is_mobile) {
        setDisplay2(true);
        setDisplay3(true);
        setDisplay4(true);
        setDisplay5(true);
      }
    }

    else {
      setDisplay2(true);
      setDisplay3(true);
      setDisplay4(true);
      setDisplay5(true);
    }
  }, []);

  //Checks for middle mouse button
  const scrollFailSafe = (e) => {
    if (e.button === 1) {
      setDisplay2(true);
      setDisplay3(true);
      setDisplay4(true);
      setDisplay5(true);
    }
  };

  return (
    <div onMouseDown={(e) => scrollFailSafe(e)}>
      <Head>
        <title>Its alright : Share your problems and get Solutions</title>
        <meta
          name="description"
          content="Get access to a rich community of therapists, doctors, motivational speakers, etc, pledging to correct your mistakes and helping you out"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <Navbar />
        <div className={styles.mainHeadBox}>
          <p className={styles.head}>Sometimes it's ok to be not ok</p>
          <p className={styles.subhead}>
            Life changes. Stuff happens. It's what us humans deal with everyday.
          </p>
          <p className={styles.subhead}>But together we can make it alright.</p>
          <span>
            <a href="/signup">
              <button
                className={`standardButton  ${styles.buttonFormats}`}
                style={{
                  width: "200px",
                  height: "50px",
                  marginTop: "20px",
                  fontWeight: 500,
                  fontSize: "1.1em",
                }}
              >
                Sign Up Today
              </button>
            </a>
          </span>
        </div>

        {/* Card 1 */}
        <div className={styles.card}>
          <div>
            <p className={styles.cardHeading}>Never Alone</p>
            <p className={styles.cardDescription}>
              <span className={styles.itsalrightspan}>Itsalright</span> is
              completely based on the community : over <b>1k</b> and growing.
              With the Browse Feature, you can look at other people's problems
              and help them find a solution. We also feature{" "}
              <b>approved experts</b>, who can give expert advice according to
              their experience.
              <br />
              <br />
              You are never alone on{" "}
              <span className={styles.itsalrightspan}>itsalright</span>, there
              is always someone to assist you.
            </p>
          </div>
          <img
            className={styles.cardImage}
            src="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="image_"
          ></img>
        </div>

        {/* Card 2 */}
        {display2 && (
          <div className={styles.card}>
            <div>
              <p className={styles.cardHeading}>Share Freely</p>
              <p className={styles.cardDescription}>
                We give you a platform where you can share your problems or
                doubts almost instantly. You can choose to post anonymously, or
                can opt for our other security features here at{" "}
                <span className={styles.itsalrightspan}>itsalright</span> .
                <br />
                <br />
                No Judging, No Fear, only solutions and positives at
                <span className={styles.itsalrightspan}> itsalright</span>
              </p>
            </div>
            <img
              className={styles.cardImage}
              src="https://images.pexels.com/photos/4021565/pexels-photo-4021565.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="image_"
            ></img>
          </div>
        )}

        {/* Real Card 3 */}
        {display3 && (
          <div className={`${styles.card}`}>
            <div>
              <p className={styles.cardHeading}>Connect & Contact</p>
              <p className={styles.cardDescription}>
                When feeling down, connecting to a friend or person who can help
                is the most important. Our Connect feature connects you with a
                random expert who will help you. Or, you can contact a specific
                person using the contact feature.
                <br />
                <br />
                Connect, Contact and Resolve on{" "}
                <span className={styles.itsalrightspan}>itsalright</span>
              </p>
            </div>
            <img
              className={styles.cardImage}
              src="https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="image_"
            ></img>
          </div>
        )}

        {/* Real Card 4 */}
        {display4 && (
          <div className={`${styles.card}`}>
            <div>
              <p className={styles.cardHeading}>Expertise & Wisdom</p>
              <p className={styles.cardDescription}>
                Here, we have over <b>1900</b> certified doctors, motivational
                speakers, teachers and experts for any problem you may have.
                Everyday these experts donate countless hours to help the
                community. You can consult these experts <b>free of cost</b> at{" "}
                <span className={styles.itsalrightspan}>itsalright</span>.
                <br />
                <br />
                We make sure every problem gets resolved at{" "}
                <span className={styles.itsalrightspan}>itsalright</span>
              </p>
            </div>
            <img
              className={styles.cardImage}
              src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1  "
              alt="image_"
            ></img>
          </div>
        )}

        {/* Real Carousel 5 */}
        {display5 && (
          <div>
            <p className={styles.testimonialHeader}>What others have to say</p>
            <br />

            <div className={styles.testimonialRow}>
              <div className={styles.testimonial}>
                <div className={styles.testimonialContent}>
                  "Itsalright offers an environment where any and every problem
                  gets solved. I love this platform and it gives me a platform
                  where I can solve people's problems, free of cost."
                </div>
                <div className={styles.testimonialPreHead}>
                  <img
                    className={styles.testimonialImage}
                    src="/assets/john.jpg"
                  ></img>
                  <div>
                    <p className={styles.testimonialName}>John Williams</p>
                    <p className={styles.testimonialSubName}>
                      Motivational Speaker
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.testimonial}>
                <div className={styles.testimonialContent}>
                  "Itsalright is a one-of-a-kind website. I was suffering from a
                  terminal disease, and was anxious and scared. I talked to one
                  of the experts, and instantly felt better and now I don't feel
                  scared at all"
                </div>
                <div className={styles.testimonialPreHead}>
                  <img
                    className={styles.testimonialImage}
                    src="/assets/mark.jpg"
                  ></img>
                  <div>
                    <p className={styles.testimonialName}>Mark Hadad</p>
                    <p className={styles.testimonialSubName}>User</p>
                  </div>
                </div>
              </div>

              <div className={styles.testimonial}>
                <div className={styles.testimonialContent}>
                  "I had bad grades in school and my teachers would always shout
                  on me. I was scared and anxious. But when I came to Itsalright
                  and simply shared my problem, in the span of one hour I
                  recieved 10 hearts and 8 comments. I feel like this is
                  something the world needs"
                </div>
                <div className={styles.testimonialPreHead}>
                  <img
                    className={styles.testimonialImage}
                    src="/assets/parth.jpg"
                  ></img>
                  <div>
                    <p className={styles.testimonialName}>Parth Parminder</p>
                    <p className={styles.testimonialSubName}>User</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.testimonialRow}>
              <div
                className={styles.testimonial}
                style={{ marginTop: "-50px" }}
              >
                <div className={styles.testimonialContent}>
                  "Every problem : however dumb or complex, will get a solution
                  here on Itsalright. This website is a true gift of god."
                </div>
                <div className={styles.testimonialPreHead}>
                  <img
                    className={styles.testimonialImage}
                    src="/assets/nout.jpg"
                  ></img>
                  <div>
                    <p className={styles.testimonialName}>Nout Natanail</p>
                    <p className={styles.testimonialSubName}>
                      Motivational Speaker & Comedian
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={styles.testimonial}
                style={{ marginTop: "-20px" }}
              >
                <div className={styles.testimonialContent}>
                  "Coming into this website I was a bit skeptical, but after
                  just one week I have fell in love with it. I was going through
                  a divorce when I came on here. I was sad, angry, and somewhat
                  depressed. I contacted Dr. Morgan Michaels on this website,
                  who responded instantly and gave me advice which actually
                  worked. 10/10"
                </div>
                <div className={styles.testimonialPreHead}>
                  <img
                    className={styles.testimonialImage}
                    src="/assets/wendy.jpg"
                  ></img>
                  <div>
                    <p className={styles.testimonialName}>Wendy Smith</p>
                    <p className={styles.testimonialSubName}>User</p>
                  </div>
                </div>
              </div>

              <div className={styles.testimonial} style={{ marginTop: "25px" }}>
                <div className={styles.testimonialContent}>
                  "Itsalright is a platform which knows no bounds. Only
                  yesterday I recieved 18 messages from users who wanted advice.
                  The feeling that I can help people who really need it free of
                  cost in only 10 minutes is something really unbelievable."
                </div>
                <div className={styles.testimonialPreHead}>
                  <img
                    className={styles.testimonialImage}
                    src="/assets/loui.jpg"
                  ></img>
                  <div>
                    <p className={styles.testimonialName}>Louisette Odila</p>
                    <p className={styles.testimonialSubName}>Doctor</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.testimonialRow}>
              <div
                className={styles.testimonial}
                style={{ marginTop: "-170px" }}
              >
                <div className={styles.testimonialContent}>
                  "This website was a gamechanger for me. I was under severe
                  stress, and had paid over 1000 dollars in just doctor
                  appointments. All it took was writing my problems down and
                  clicking the Share button. Within a matter of an hour I
                  recieved solutions and hearts. If you are looking for a place
                  to vent out, look no further."
                </div>
                <div className={styles.testimonialPreHead}>
                  <img
                    className={styles.testimonialImage}
                    src="/assets/joe.jpg"
                  ></img>
                  <div>
                    <p className={styles.testimonialName}>
                      Joseph Francis Peter
                    </p>
                    <p className={styles.testimonialSubName}>User</p>
                  </div>
                </div>
              </div>

              <div className={styles.testimonial} style={{ marginTop: "20px" }}>
                <div className={styles.testimonialContent}>
                  "This website gives an experience which cannot be compared to.
                  Fellow Doctors, Motivational Speakers, or fellow Good
                  Samaritans, look no more, this is the website where you can
                  make an impact."
                </div>
                <div className={styles.testimonialPreHead}>
                  <img
                    className={styles.testimonialImage}
                    src="/assets/reg.jpg"
                  ></img>
                  <div>
                    <p className={styles.testimonialName}>Regulus Geno</p>
                    <p className={styles.testimonialSubName}>Doctor</p>
                  </div>
                </div>
              </div>

              <div className={styles.testimonial} style={{ marginTop: "25px" }}>
                <div className={styles.testimonialContent}>
                  "This is the next Facebook. The Community : Doctors,
                  Motivational Speakers, Samaritans, People who want to do good
                  to this world, join together like the Avengers to take down
                  depression and anxiety."
                </div>
                <div className={styles.testimonialPreHead}>
                  <img
                    className={styles.testimonialImage}
                    src="/assets/blake.jpg"
                  ></img>
                  <div>
                    <p className={styles.testimonialName}>Blake Lucas</p>
                    <p className={styles.testimonialSubName}>User</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <br />
        <Footer />
      </div>
    </div>
  );
}
