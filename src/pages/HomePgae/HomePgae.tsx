import LeftPanel from '../../components/CardList/LeftPanel/LeftPanel';
import RightPanel from '../../components/CardList/RightPanel/RightPanel';
import Main from '../../components/Main/Main';
import SearchForm from '../../components/Search/Form';
import Spinner from '../../components/Spinner/Spinner';
import ErrorMsg from '../../components/Templates/ErrorMsg/ErrorMsg';
import PageHeader from '../../components/Templates/PageHeader/PageHeader';
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

        <section className="app__results" data-testid="cardListSection">
          <PageHeader level={2} className="app__results-header">
            Result
          </PageHeader>

          <section className="app__results-output">
            <div className="app__output">
              {error && (
                <ErrorMsg
                  errorMsg={typeof error === 'string' ? error : String(error)}
                />
              )}
              {!error && loading && <Spinner />}
              {!error &&
                !loading &&
                data &&
                data?.length > 0 &&
                data.map((item) => {
                  return (
                    <div className="app__result" key={item.id}>
                      <RightPanel item={item} />
                      <LeftPanel item={item} />
                    </div>
                  );
                })}
              {!error && !loading && (!data || data.length === 0) && (
                <ErrorMsg errorMsg="Nothing matched your query" />
              )}
            </div>
          </section>
        </section>
      </Main>
    </>
  );
};

export default HomePage;
