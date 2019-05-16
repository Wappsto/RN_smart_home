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
    justifyContent: 'center',
    width: bWidth - 80,
    height: 40
  },
  input: {
    marginTop: 40,
    textAlign: 'center',
    borderWidth: 0.4,
    borderColor: 'black',
    width: bWidth - 80,
    height: 40
  },
  buttonText: {
    color: 'cyan'
  },
  header: {
    marginTop: 30
  },
  content: {
    height: bHeight * 3.8 / 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    width: bWidth,
    paddingBottom: 20,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  row: {
    flex: 0,
    flexDirection: 'row'
  },
  timestamp: {
    color: '#cccccc'
  },
  icons: {
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 10
  }
});

export default styles;
