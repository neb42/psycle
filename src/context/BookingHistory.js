// @flow

import React from 'react';

const BookingHistoryContext = React.createContext({});

export const BookingHistoryProvider = BookingHistoryContext.Provider;
export const BookingHistoryConsumer = BookingHistoryContext.Consumer;
