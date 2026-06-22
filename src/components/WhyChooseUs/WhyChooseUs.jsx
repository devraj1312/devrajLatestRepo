import "./WhyChooseUs.scss";

const features = [
  {
    image: "/src/assets/images/experties.png",
    title: "Local Expertise",
    desc: "Deep knowledge of Ujjain temples and surrounding areas."
  },
  {
    image: "/src/assets/images/customizedplan.png",
    title: "Customized Plans",
    desc: "Tailor-made spiritual packages as per your needs."
  },
  {
    image: "/src/assets/images/pandit.png",
    title: "Experienced Pandits",
    desc: "Verified and experienced pandits for rituals & poojas."
  },
  {
    image: "/src/assets/images/experience.png",
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