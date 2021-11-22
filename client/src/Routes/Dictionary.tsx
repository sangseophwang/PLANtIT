import React from 'react';
import Pathology from '../Assets/Dummy/Pathology';
import Navigation from '../Components/Common/Navigation';
import DictTopSection from '../Components/Dictionary/DictTopSection';
import SearchBar from '../Components/Dictionary/SearchBar';

export default function Dictionary(): JSX.Element {
  return (
    <div>
      <Navigation />
      <DictTopSection />
      <SearchBar data={Pathology} />
    </div>
  );
}
