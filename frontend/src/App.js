import Navigation from "./navigation/Navigation"
import Header from "./Header/Header"

const DUMMY = {
  name: "Aditya Sinha",
  email: "adityasinha6060@gmail.com",
  password: "aditya",
  codeChefUserName: "abc",
  following: [
    {
      name: "ujjwal raj, husband of tulsi",
    },
  ],
};

function App() {
  return (
    <div>
      <Navigation />
      <Header name={DUMMY.name}/>
    </div>
  );
}

export default App;
