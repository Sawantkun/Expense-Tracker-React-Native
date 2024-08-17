import { View, StatusBar, Platform } from 'react-native';

const ScreenWrapper = ({ children }) => {
    let statusBarHeight = StatusBar.currentHeight? StatusBar.currentHeight: Platform.OS=='ios'? 30:0;
  return (

      <View style={{paddingTop:30}}>
        {children}
      </View>
  );
};

export default ScreenWrapper;
