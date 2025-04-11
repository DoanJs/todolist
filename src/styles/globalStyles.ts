import {Platform, StyleSheet} from 'react-native';
import {colors} from '../contants/colors';
import {fontFamilies} from '../contants/fontFamilies';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 52 : 42,
  },
  section: {
    marginBottom: 16,
  },
  inputContainer: {
    backgroundColor: colors.gray,
    borderRadius: 12,
    paddingHorizontal: Platform.OS === 'ios' ? 12 : 10,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
  },
  text: {
    fontSize: 14,
    fontFamily: fontFamilies.regular,
    color: colors.text,
  },
  documentImg: {
    marginHorizontal: 4
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tag: {
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 6 : 4,
    borderRadius: 100,
    backgroundColor: colors.blue,
  },
  card: {
    borderRadius: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14
  },
});
