import Banner from "../../Components/Home/BannerHome/bannerHome";
import CardHome from "../../Components/Home/CardHome/cardHome";
import iconChat from "../../Assets/icon-chat.png";
import iconMoney from "../../Assets/icon-money.png";
import iconSecurity from "../../Assets/icon-security.png";

function Home() {
  return (
    <>
        <Banner />
        <main>
          <section className="features">
            <h2 className="sr-only">Features</h2>
            <CardHome
              img={iconChat}
              alt="Chat Icon"
              title="You are our #1 priority"
              text=" Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
            />

            <CardHome
              img={iconMoney}
              alt="Chat Icon"
              title="More savings means higher rates"
              text=" The more you save with us, the higher your interest rate will be!"
            />

            <CardHome
              img={iconSecurity}
              alt="Chat Icon"
              title="Security you can trust"
              text=" We use top of the line encryption to make sure your data and money
            is always safe."
            />
          </section>
        </main>
        
     
    </>
  );
}
export default Home;
