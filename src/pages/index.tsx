import Blurb from "./components/Blurb";
import EmailCallTabs from "./components/EmailCallTabs";

export default function Home() {
  return (
    <main>
      <Blurb/>
      <EmailCallTabs email="hi sleepy joe." number="1234567890"/>
    </main>
  );
}
