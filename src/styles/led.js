import { StyleSheet } from 'react-native';

const bWidth = 300;
const bHeight = 250;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: bWidth,
    height: bHeight,
    justifyContent: 'center',
    alignSelf: 'center',
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
  centeredText: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 28
  },
  button: {
    borderWidth: 1,
    borderColor: 'cyan',
    paddingLeft: 40,
    paddingRight: 40,
  },
  input: {
    borderWidth: 0.4,
    borderColor: 'black',
    paddingLeft: 100,
    paddingRight: 100
  },
  buttonText: {
    color: 'cyan'
  },
  header: {
    backgroundColor: 'green'
  },
  content: {
    height: bHeight * 4 / 5,
    justifyContent: 'center'
  },
  footer: {
    width: bWidth,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'space-between'
  },
  row: {
    flex: 0,
    flexDirection: 'row'
  },
  timestamp: {
    color: '#cccccc'
  }
});

export default styles;
