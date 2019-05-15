import { StyleSheet } from 'react-native';

const bWidth = 200;
const bHeight = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: bWidth,
    height: bHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  shadow: {
    borderColor: 'black',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 3
  },
  box: {
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 10
  },
  content: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  footer: {
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
    alignSelf: 'flex-start'
  },
  timestamp: {
    color: '#cccccc'
  },
  info: {
    alignItems: 'flex-start'
  },
  infoName: {
    alignSelf: 'center'
  }
});

export default styles;
