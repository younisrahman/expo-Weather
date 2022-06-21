import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

const MyHeader = (prpos) => {
    return (
        <Appbar.Header>
        <Appbar.Content
          title="Weather App"
          subtitle={prpos.title}
        />
      </Appbar.Header>
    )
}

export default MyHeader;
