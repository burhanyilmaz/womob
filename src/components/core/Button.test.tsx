import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';

import Button from './Button';

describe('Button', () => {
  const buttonTitle = 'Close';
  it('should render correctly', () => {
    render(<Button title={buttonTitle} onPress={() => null} />);

    expect(screen.getByText(buttonTitle)).toBeTruthy();
  });

  it('should render loading correctly', () => {
    render(<Button title={buttonTitle} onPress={() => null} />);
    expect(screen.queryAllByTestId('buttonLoading')).toHaveLength(0);

    render(<Button title={buttonTitle} onPress={() => null} isLoading />);
    expect(screen.getByTestId('buttonLoading')).toBeTruthy();
  });

  it('should call onPress when presses the button', async () => {
    const onPress = jest.fn();
    render(<Button title={buttonTitle} onPress={onPress} />);

    const button = screen.getByRole('button', { name: buttonTitle });
    fireEvent.press(button);

    await waitFor(() => {
      expect(onPress).toHaveBeenCalled();
    });
  });
});
