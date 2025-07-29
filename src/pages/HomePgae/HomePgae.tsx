import { useEffect } from 'react';
import { Link, Outlet, useMatch, useSearchParams } from 'react-router-dom';
import LeftPanel from '../../components/CardList/LeftPanel/LeftPanel';
import Main from '../../components/Main/Main';
import SearchForm from '../../components/Search/Form';
import Spinner from '../../components/Spinner/Spinner';
import ErrorMsg from '../../components/Templates/ErrorMsg/ErrorMsg';
import PageHeader from '../../components/Templates/PageHeader/PageHeader';
import { useAppContext } from '../../context/AppContext';
import Pagination from '../../Pagination/Pagination';

const HomePage = () => {
  const {
    searchTerm,
    setSearchTerm,
    handleSearch,
    data,
    loading,
    error,
    totalPages,
  } = useAppContext();
  const [searchParams] = useSearchParams();

  const isDetailsPageActive = useMatch('/details/:id');
  const currentPage: number = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    handleSearch?.(searchTerm, currentPage);
  }, [searchTerm, currentPage, handleSearch]);

  const handleFormSearch = (term: string) => {
    setSearchTerm?.(term);
  };

  return (
    <Main>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <SearchForm
        value={searchTerm ?? ''}
        onSearch={handleFormSearch}
        onChange={(value) => setSearchTerm?.(value)}
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
              <div
                className={
                  isDetailsPageActive
                    ? 'app__right-panel--active'
                    : 'app__right-panel'
                }
              >
                <Outlet />
              </div>
            </div>
          </div>
          {!error && !loading && data && data.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages ?? 1}
            />
          )}
        </section>
      </section>
    </Main>
  );
};

export default HomePage;
