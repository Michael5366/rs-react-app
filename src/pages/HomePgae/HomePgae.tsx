import CardList from '../../components/CardList/CardList';
import Main from '../../components/Main/Main';
import SearchForm from '../../components/Search/Form';
import { useAppContext } from '../../context/AppContext';

const HomePage = () => {
  const { searchTerm, setSearchTerm, handleSearch, data, loading, error } =
    useAppContext();

  return (
    <>
      <Main>
        <SearchForm
          value={searchTerm}
          onSearch={handleSearch}
          onChange={(value) => setSearchTerm(value)}
        />
        <CardList data={data} loading={loading} error={error} />
      </Main>
    </>
  );
};

export default HomePage;
