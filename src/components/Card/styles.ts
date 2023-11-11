import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E3E3E3',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 8,
    borderRadius: 4
  },
  content: {
    flex: 0,
    // padding: 40,
    borderRadius: 10,
    width: '60%',
    paddingLeft: 5,
    paddingRight: 50
  },
  title: {
    fontSize: 15,
    lineHeight: 18,
    color: '#3D434D',
    fontWeight: 'bold',
    paddingRight: 40
  },
  Data: {
    color: '#888D97',
    fontSize: 13,
    paddingRight: 40,
    width: '100%'
  },
  finalizado: {
    color: '#1967FB',
    fontSize: 15,
    fontWeight: 'bold',
    paddingRight: 40
  },
  button: {
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#E3E3E3',
  }
});
