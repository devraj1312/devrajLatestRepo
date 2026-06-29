import "./WhyChooseUs.scss";
import expertiesImg from "../../assets/images/experties.png";
import customizedplanImg from "../../assets/images/customizedplan.png";
import panditImg from "../../assets/images/pandit.png";
import experienceImg from "../../assets/images/experience.png";

const features = [
  {
    image: expertiesImg,
    title: "Local Expertise",
    desc: "Deep knowledge of Ujjain temples and surrounding areas."
  },
  {
    image: customizedplanImg,
    title: "Customized Plans",
    desc: "Tailor-made spiritual packages as per your needs."
  },
  {
    image: panditImg,
    title: "Experienced Pandits",
    desc: "Verified and experienced pandits for rituals & poojas."
  },
  {
    image: experienceImg,
    title: "Seamless Experience",
    desc: "Everything at one place for a hassle-free journey."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="why-choose">
      <div className="container">
        <div className="why-heading">
          <h2>
            Why Choose <span>UjjainYatra?</span>
          </h2>

           <p className="heading-decoration">
            ༺ ━━━━━━ 𑁍 ━━━━━━━ ༻
          </p>

        </div>

        <div className="why-features">

          {features.map((item, index) => (
            <div className="why-item" key={index}>

              <div className="image-circle">
                <img
                  src={item.image}
                  alt={item.title}
                />
              </div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;