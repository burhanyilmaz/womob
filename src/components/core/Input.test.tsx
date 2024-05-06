import { fireEvent, render, screen } from '@testing-library/react-native';
import { Search } from 'lucide-react-native';

import Input from './Input';

describe('Input', () => {
  it('should render correctly', () => {
    render(
      <Input
        onChangeText={() => {}}
        placeholder="Search..."
        rightIcon={<Search testID="searchIcon" />}
      />,
    );

    expect(screen.getByPlaceholderText('Search...')).toBeTruthy();
    expect(screen.getAllByTestId('searchIcon')).toBeTruthy();

    render(
      <Input
        value="search keyword"
        onChangeText={() => {}}
        placeholder="Search..."
        rightIcon={<Search testID="searchIcon" />}
      />,
    );

    expect(screen.getByDisplayValue('search keyword')).toBeTruthy();
  });

  it('Should call onChangeText function when text input changes', () => {
    const onChangeText = jest.fn();

    render(
      <Input
        placeholder="Search..."
        onChangeText={onChangeText}
        rightIcon={<Search testID="searchIcon" />}
      />,
    );

    fireEvent(screen.getByPlaceholderText('Search...'), 'changeText', 'article 1');

    expect(onChangeText).toHaveBeenCalledWith('article 1');
  });
});
