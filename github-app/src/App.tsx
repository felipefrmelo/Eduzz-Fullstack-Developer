import { Profile, Repositories, Layout } from "./components";
import faker from "faker";
import { Repository } from "./components/repositories";

const user = {
  name: "John Doe",
  username: "johndoe",
  company: "Company",
  location: "Location",
  blog: "https://blog.com",
  followers: 10,
  following: 20,
  public_repos: 30,
  public_gists: 40,
  avatar_url: faker.image.avatar(),
  html_url: "https://john.com",
};

const makeRepository = (): Repository => ({
  name: faker.random.word() + " " + faker.datatype.uuid().substring(0, 4),
  full_name: faker.random.word() + " " + faker.datatype.uuid().substring(0, 4),
  language: faker.random.words() + " " + faker.datatype.uuid().substring(0, 4),
});

const repositories: Repository[] = [...Array(10)].map(makeRepository);

const starred: Repository[] = [...Array(10)].map(makeRepository);

function App() {
  return (
    <Layout>
      <Profile user={user} />
      <Repositories repos={repositories} starred={starred} />
    </Layout>
  );
}

export default App;
