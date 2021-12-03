import 'Components/Home/scss/Third.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Third(props: any): JSX.Element {
  const [filterData, setFilterData] = useState<any[]>([]);
  const [clearWord, setClearWord] = useState('');

  const FilterOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = e.target.value;
    setClearWord(searchWord);
    const newFilter = props.data.filter((value: any) => {
      return value.name.includes(searchWord);
    });
    setFilterData(newFilter);
  };

  const clearInput = () => {
    setFilterData([]);
    setClearWord('');
  };

  useEffect(() => {}, [props]);

  return (
    <section className="Third__Container">
      <section className="HSearch__Container">
        <div className="HSearch__Input">
          {filterData.length === 0 ? (
            <svg
              className="HSearch__Icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="HClose__Icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={clearInput}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
          <input
            type="text"
            value={clearWord}
            placeholder="작물의 이름을 검색해주세요"
            onChange={FilterOnChangeHandler}
          />
        </div>
      </section>
      {filterData.length !== 0 && (
        <div className="Data__Result">
          {filterData.map(option => (
            <Link
              to={`/Dictionary?name=${option.name}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <div className="Data__Item">
                <svg
                  className="Search__Sub-Icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {option.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
