import { ContourMultiPolygon } from 'd3-contour';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import * as React from 'react';
import axios from 'axios';
import Data from '../Data';

type Data = {
  calendar: {
    dataByDay: {
      key: string;
      values: any;
      value: undefined;
    }[];
  };
  classCount: {
    count: any;
    monthCount: number;
    averagePerMonth: string;
  };
  favouriteInstructor: {
    favouriteInstructorName: any;
  };
  instructorBars: {
    instructorCounts: {
      key: string;
      values: any;
      value: undefined;
    }[];
    yScale: [number, number] & ScaleBand<string>;
    xScale: ScaleLinear<number, number, never>;
    colorScale: ScaleLinear<number, number, never>;
  };
  studio: {
    studio1ContourDensity: ContourMultiPolygon[];
    studio2ContourDensity: ContourMultiPolygon[];
    contourDensityColorScale: number[] & ScaleLinear<number, number, never>;
    favouriteBikes: number[];
  };
  weeklyLollipop: {
    weeklyCount: {
      key: string;
      values: any;
      value: undefined;
    }[];
    yScale: number[] & ScaleLinear<number, number, never>;
    xScale: ScaleLinear<number, number, never>;
  };
  movingAverage: {
    dataByMonth: {
      key: string;
      values: any;
      value: undefined;
    }[];
    xScale: Date[] & ScaleTime<number, number, never>;
    yScale: ScaleLinear<number, number, never>;
  };
};

type Margin = { top:number, left:number, bottom:number, right:number};

const emptyData: Data = {
  calendar: {},
  classCount: {},
  favouriteInstructor: {},
  instructorBars: {},
  studio: {},
  weeklyLollipop: {},
  movingAverage: {},
};

const axiosInstance = axios.create({
  baseURL: 'https://psycle.codexfit.com/api/v1/customer/',
});

const width = 600;

const height = 520;

const margin: Margin = { top: 0, left: 30, bottom: 40, right: 10 };

export const DataContext = React.createContext<
  Data & {
    filters: {
      location: string;
      classType: string;
    };
    instructors: any[];
    loaded: boolean;
    bookingHistory: any[];
    setLocationFilter: Function;
    setClassTypeFilter: Function;
    login: (email: string, password: string) => any;
    width: number,
    height: number,
    margin: Margin,
  }
>({
  ...emptyData,
  filters: {
    location: '',
    classType: '',
  },
  instructors: [],
  loaded: false,
  bookingHistory: [],
  setLocationFilter: () => {},
  setClassTypeFilter: () => {},
  login: () => {},
  width,
  height,
  margin,
});

export const DataContextProvider = ({ children }: { children: any }) => {
  const [token, setToken] = React.useState<string>('');
  const [rawData, setRawData] = React.useState<any>(null);
  const [data, setData] = React.useState<Data>(emptyData);
  const [bookingHistory, setBookingHistory] = React.useState<any[]>([]);
  const [location, setLocation] = React.useState<string>('');
  const [classType, setClassType] = React.useState<string>('');
  const [instructors, setInstructors] = React.useState<any[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const login = async (email: string, password: string) => {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
      remember_me: true,
    });
    if (response.data.success) {
      setToken(response.data.access_token);
    }
  };

  const getRawData = async (accessToken: string) => {
    const response = await axiosInstance.post('/bookingslimit=5&page=1', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    setRawData(response.data);
  };

  const getBookingHistory = (rawData: any): any[] => {
      const filteredBookingHistory = bookingHistory.filter(
        bh => location === bh.location && classType === bh.classType,
      );
  };

  const getInstructors = (rawData: any): any[] => {};

  React.useEffect(() => {
    if (token.length > 0) {
      getRawData(token);
    }
  }, [token]);

  React.useEffect(() => {
    getBookingHistory(rawData);
  }, [JSON.stringify(rawData), location, classType]);

  React.useEffect(() => {
    getInstructors(rawData);
  }, [JSON.stringify(rawData)]);

  React.useEffect(() => {
    if (bookingHistory.length > 0) {
      setData(Data({
        bookingHistory,
        height: height, // - this.margin.top - this.margin.bottom,
        width: width, // - this.margin.left - this.margin.right,
      }))
    }
  }, [JSON.stringify(bookingHistory), width, height]);

  return (
    <DataContext.Provider
      value={{
        ...data,
        filters: {
          location,
          classType,
        },
        instructors,
        loaded,
        bookingHistory,
        setLocationFilter: setLocation,
        setClassTypeFilter: setClassType,
        login,
        width,
        height,
        margin,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => React.useContext(DataContext);
