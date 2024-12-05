import AuthorCard from "@/components/AuthorCard";
import MediumPosts from "@/components/MediumPosts";

import Page from "@/components/page";

function App() {
  return (
    <Page>
      <AuthorCard />
      <MediumPosts username="chrismccully" />
    </Page>
  );
}

export default App;
