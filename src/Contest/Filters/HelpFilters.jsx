import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../store/slices/contestSlice';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'HackerRank', label: 'Hacker Rank' },
  { value: 'HackerEarth', label: 'Hacker Earth' },
  { value: 'CodeChef', label: 'Code Chef' },
  { value: 'CodeForces', label: 'Code Forces' },
  { value: 'LeetCode', label: 'Leet Code' },
  { value: 'Kick Start', label: 'Kick Start' },
  { value: 'AtCoder', label: 'AtCoder' },
];

const HelpFilter = () => {
  const dispatch = useDispatch();

  return (
    <>
      {filterOptions.map(option => (
        <button
          key={option.value}
          onClick={() => dispatch(setFilter(option.value))}
          className="contest-btns"
        >
          {option.label}
        </button>
      ))}
    </>
  );
};

export default HelpFilter;
