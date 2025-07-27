import { useSearchParams } from 'react-router-dom';
import LeftPanel from '../../components/CardList/LeftPanel/LeftPanel';
import Main from '../../components/Main/Main';
import SearchForm from '../../components/Search/Form';
import Spinner from '../../components/Spinner/Spinner';
import ErrorMsg from '../../components/Templates/ErrorMsg/ErrorMsg';
import PageHeader from '../../components/Templates/PageHeader/PageHeader';
import { useAppContext } from '../../context/AppContext';
import RightPanel from '../../components/CardList/RightPanel/RightPanel';

const HomePage = () => {
  const { searchTerm, setSearchTerm, handleSearch, data, loading, error } =
    useAppContext();
  const [searchParams] = useSearchParams();

  const detailsId = searchParams.get('details');

  return (
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
          <div className="app__output-wrapper">
            <div className="app__result">
              <div className="app__left-panel">
                {error && <ErrorMsg errorMsg={error} />}
                {!error && loading && <Spinner />}
                {!error &&
                  !loading &&
                  data &&
                  data.length > 0 &&
                  data.map((item) => (
                    <div className="app__left-panel-name" key={item.id}>
                      <LeftPanel item={item} />
                    </div>
                  ))}
                {!error && !loading && (!data || data.length === 0) && (
                  <ErrorMsg errorMsg="Nothing matched your query" />
                )}
              </div>
              <div className="app__right-panel">
                {detailsId ? (
                  <RightPanel />
                ) : (
                  <p>Select an episode to view details.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </section>
    </Main>
  );
};

export default HomePage;
