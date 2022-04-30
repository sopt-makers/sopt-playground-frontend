import axios from 'axios';
import Image from 'next/image';
import { useQuery } from 'react-query';

export const API_PATH = 'https://dog.ceo/api/breeds/image/random';
const fetch = axios.get(API_PATH);

const Example = () => {
  const { data } = useQuery('getDog', () => fetch);
  return <img src={data?.data.message ?? ''} alt='dog' />;
};

export default Example;
