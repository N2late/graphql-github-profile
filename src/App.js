import './App.css';
import { gql, useQuery } from '@apollo/client';

const profileQuery = gql`
  query ProfileQuery($username: String = "N2Late") {
    user(login: $username) {
      name
      avatarUrl
      repositories(first: 40) {
        edges {
          node {
            name
            id
            url
          }
        }
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(profileQuery, {
    variables: { username: 'N2Late' },
  });
  return loading ? (
    <div> Hold your horses</div>
  ) : (
    <div id="App">
      <h1>{data.user.name}</h1>
      <img src={data.user.avatarUrl} alt="github profile photo" />
      <ul>
        {data.user.repositories.edges.map(({ node: { name, id, url } }) => (
          <a href={url}>
            <li key={id}>{name}</li>
          </a>
        ))}
      </ul>
    </div>
  );
}

export default App;
