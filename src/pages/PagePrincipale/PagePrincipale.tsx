import "./PagePrincipale.css";
import BoutonJouer from "../../composants/ui/BoutonJouer";

function PagePrincipale() {
  return (
    <>
    <img className="background" src="/images/Stickmania_1.png" alt="Stickmania" />
    <div className="container">
      <BoutonJouer/>
    </div>
    </>
  );
}

export default PagePrincipale;
