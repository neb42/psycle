import { ContourMultiPolygon } from 'd3-contour';
import { scaleBand, ScaleBand, ScaleLinear, ScaleTime, scaleLinear, scaleTime } from 'd3-scale';
import * as React from 'react';
import axios from 'axios';

import Data from '../Data';

export type RawData = {
  relations: {
    event_types: {
      group: {
        handle: 'ride' | string;
        id: number;
        name: string 
        order: 1
      }
      handle: 'ride-45' | 'ride-60' | string;
      id: 1
      is_visible: 1
      metafields: {
        description: string;
      }
    }[],
    events: {
      event_type_id: number
      id: number 
      instructor_id: number 
      is_live_stream: false
      is_visible: true
      start_at: "2021-07-27T17:30:00.000000Z"
      status: "finished" | string
      studio_id: 91
    }[],
    instructors: {
      first_name: string
      full_name: string
      handle: string
      id: number
      image_1: string, 
      is_visible: 1 | 0,
      last_name: string | null
      metafields: {
        description: string, 
        instagram_handle: string | null,
        spotify_handle: string | null,
        tags: string | null
      }
      photo: string 
    }[],
    locations: {
      address: string 
      description: string, 
      email: string, 
      handle: string,
      id: number
      image: string 
      is_visible: 1 | 0,
      name: string 
      telephone: string, 
    }[],
    studios: {
      handle: string 
      has_layout: boolean 
      id: number
      is_visible: 1 | 0
      location_id: number
      name: string 
      occupancy: number 
      layout: {
        object: {id: number, x: number, y: number}[],
        slots: {id: number, x: number, y: number}[],
      },
    }[],
  },
}

export type Data = {
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
    yScale: ScaleBand<string>;
    xScale: ScaleLinear<number, number, never>;
    colorScale: ScaleLinear<number, number, never>;
  };
  studio: {
    studio1ContourDensity: ContourMultiPolygon[];
    studio2ContourDensity: ContourMultiPolygon[];
    contourDensityColorScale: ScaleLinear<string, string, never>;
    favouriteBikes: number[];
  };
  weeklyLollipop: {
    weeklyCount: {
      key: string;
      values: any;
      value: undefined;
    }[];
    yScale: ScaleLinear<number, number, never>;
    xScale: ScaleLinear<number, number, never>;
  };
  movingAverage: {
    dataByMonth: {
      key: string;
      values: any;
      value: undefined;
    }[];
    xScale: ScaleTime<number, number, never>;
    yScale: ScaleLinear<number, number, never>;
  };
};

export type Margin = { top: number; left: number; bottom: number; right: number };

const emptyData: Data = {
  calendar: {
    dataByDay: [],
  },
  classCount: {
    count: 0,
    monthCount: 0,
    averagePerMonth: '',
  },
  favouriteInstructor: {
    favouriteInstructorName: '',
  },
  instructorBars: {
    instructorCounts: [],
    yScale: scaleBand(),
    xScale: scaleLinear(),
    colorScale: scaleLinear(), 
  },
  studio: {
    studio1ContourDensity: [],
    studio2ContourDensity: [],
    contourDensityColorScale: scaleLinear(), 
    favouriteBikes: [],
  },
  weeklyLollipop: {
    weeklyCount: [],
    yScale: scaleLinear(),
    xScale: scaleLinear(), 
  },
  movingAverage: {
    dataByMonth: [],
    xScale: scaleTime(), 
    yScale: scaleLinear(), 
  },
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
    width: number;
    height: number;
    margin: Margin;
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
    const response = await axiosInstance.post('/bookings?type=previous&limit=5&page=1', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    setRawData(response.data);
  };

  const getBookingHistory = (d: any) => {
    const filteredBookingHistory = bookingHistory.filter(
      (bh) => location === bh.location && classType === bh.classType,
    );
    setBookingHistory([]);
  };

  const getInstructors = (rawData: any) => {
    setInstructors([]);
  };

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
      setData(
        Data({
          bookingHistory,
          height, // - this.margin.top - this.margin.bottom,
          width, // - this.margin.left - this.margin.right,
        }),
      );
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
