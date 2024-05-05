import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { useGlobalContext } from "./Components/ThemeContext";

export function App() {
  const { activeTab } = useGlobalContext();
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label="Dogs: ">
        {activeTab !== "form" && <Dogs />}
        {activeTab == "form" && <CreateDogForm />}
      </Section>
    </div>
  );
}
