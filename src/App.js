import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

StatusBar.setBackgroundColor('#3E5159');
StatusBar.setBarStyle('light-content');

const App = () => {
  const [calcStr, setCalcStr] = useState('');
  const [result, setResult] = useState(0);

  const buttons = useMemo(() => [
    [
      {
        text: 'AC',
        backgroundColor: 'transparent',
        color: '#FCFFFF',
        touchableColor: '#3E5159',
        function: () => {
          setCalcStr('');
          setResult(0);
        },
      },
      {
        text: '^',
        backgroundColor: 'transparent',
        color: '#FCFFFF',
        touchableColor: '#3E5159',
        function: () => {
          if (!endWithSymbol(calcStr)) {
            setCalcStr(calcStr + '^');
          }
        },
      },
      {
        text: '%',
        backgroundColor: 'transparent',
        color: '#FCFFFF',
        touchableColor: '#3E5159',
        function: () => {
          if (!endWithSymbol(calcStr)) {
            setCalcStr(calcStr + '%');
          }
        },
      },
      {
        text: '÷',
        fontSize: 28,
        backgroundColor: '#D9D9D9',
        color: '#161F26',
        touchableColor: '#8aa0a8',
        function: () => {
          if (!endWithSymbol(calcStr)) {
            setCalcStr(calcStr + '÷');
          }
        },
      },
    ],
    [
      {
        text: '7',
        backgroundColor: 'transparent',
        color: '#FCFFFF',
        touchableColor: '#3E5159',
        function: () => setCalcStr(calcStr + '7'),
      },
      {
        text: '8',
        backgroundColor: 'transparent',
        color: '#FCFFFF',
        touchableColor: '#3E5159',
        function: () => setCalcStr(calcStr + '8'),
      },
      {
        text: '9',
        backgroundColor: 'transparent',
        color: '#FCFFFF',
        touchableColor: '#3E5159',
        function: () => setCalcStr(calcStr + '9'),
      },
      {
        text: '',
        icon: 'close',
        backgroundColor: '#D9D9D9',
        color: '#161F26',
        touchableColor: '#8aa0a8',
        function: () => {
          if (!endWithSymbol(calcStr)) {
            setCalcStr(calcStr + 'x');
          }
        },
      },
    ],
    [
      {
        text: '4',
        backgroundColor: 'transparent',
        color: '#FCFFFF',
        touchableColor: '#3E5159',
        function: () => setCalcStr(calcStr + '4'),
      },
      {
        text: '5',
        backgroundColor: 'transparent',
        color: '#FCFFFF',
        touchableColor: '#3E5159',
        function: () => setCalcStr(calcStr + '5'),
      },
      {
        text: '6',
        backgroundColor: 'transparent',
        color: '#FCFFFF',
        touchableColor: '#3E5159',
        function: () => setCalcStr(calcStr + '6'),
      },
      {
        text: '',
        icon: 'remove',
        backgroundColor: '#D9D9D9',
        color: '#161F26',
        touchableColor: '#8aa0a8',
        function: () => {
          if (!endWithSymbol(calcStr)) {
            setCalcStr(calcStr + '-');
          }
        },
      },
    ],
    [
      {
        text: '1',
        backgroundColor: 'transparent',
        color: '#FCFFFF',
        touchableColor: '#3E5159',
        function: () => setCalcStr(calcStr + '1'),
      },
      {
        text: '2',
        backgroundColor: 'transparent',
        color: '#FCFFFF',
        touchableColor: '#3E5159',
        function: () => setCalcStr(calcStr + '2'),
      },
      {
        text: '3',
        backgroundColor: 'transparent',
        color: '#FCFFFF',
        touchableColor: '#3E5159',
        function: () => setCalcStr(calcStr + '3'),
      },
      {
        text: '',
        icon: 'add',
        backgroundColor: '#D9D9D9',
        color: '#161F26',
        touchableColor: '#8aa0a8',
        function: () => {
          if (!endWithSymbol(calcStr)) {
            setCalcStr(calcStr + '+');
          }
        },
      },
    ],
    [
      {
        text: '0',
        backgroundColor: 'transparent',
        color: '#FCFFFF',
        touchableColor: '#3E5159',
        function: () => setCalcStr(calcStr + '0'),
      },
      {
        text: ',',
        backgroundColor: 'transparent',
        color: '#FCFFFF',
        touchableColor: '#3E5159',
        function: () => {
          if (!endWithSymbol(calcStr)) {
            setCalcStr(calcStr + ',');
          }
        },
      },
      {
        text: '',
        icon: 'backspace',
        backgroundColor: 'transparent',
        color: '#FCFFFF',
        touchableColor: '#3E5159',
        function: () => setCalcStr(calcStr.slice(0, -1)),
      },
      {
        text: '=',
        backgroundColor: '#F2622E',
        color: '#FCFFFF',
        touchableColor: 'default',
        fontSize: 28,
        function: () => {
          result === 0 ? setCalcStr('') : setCalcStr(result.toString());
        },
      },
    ],
  ]);

  const endWithSymbol = calc => {
    return (
      calc.endsWith('^') ||
      calc.endsWith('%') ||
      calc.endsWith('÷') ||
      calc.endsWith('x') ||
      calc.endsWith('-') ||
      calc.endsWith('+') ||
      calc.endsWith(',') ||
      calc == ''
    );
  };

  const includeAnExpression = calc => {
    return (
      (calc.includes('^') ||
        calc.includes('%') ||
        calc.includes('÷') ||
        calc.includes('x') ||
        calc.includes('-') ||
        calc.includes('+') ||
        calc.includes(',')) &&
      !endWithSymbol(calc)
    );
  };

  const calculate = () => {
    let formattedCalc = calcStr;

    if (!includeAnExpression(formattedCalc)) {
      return;
    }

    if (endWithSymbol(formattedCalc)) {
      formattedCalc = formattedCalc.slice(0, -1);
    }

    formattedCalc = formattedCalc
      .replaceAll('x', '*')
      .replaceAll('÷', '/')
      .replaceAll('^', '**')
      .replaceAll(',', '.');

    const calc = eval(formattedCalc);

    setResult(calc || 0);
  };

  useEffect(() => calculate(), [calcStr]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Calculadora</Text>
      </View>

      <View style={styles.displayContainer}>
        <Text style={styles.displayCalc}>{calcStr}</Text>
        <Text style={styles.displayResult}>{result}</Text>
      </View>

      <View style={styles.keyboardContainer}>
        {buttons.map((row, index) => (
          <View style={styles.row} key={index}>
            {row.map((button, index) => (
              <TouchableNativeFeedback
                key={index}
                onPress={() => button.function()}
                background={TouchableNativeFeedback.Ripple(
                  button.touchableColor,
                  false,
                  32,
                )}>
                <View
                  style={[
                    styles.key,
                    {backgroundColor: button.backgroundColor},
                  ]}>
                  {button.text ? (
                    <Text
                      style={{
                        color: button.color,
                        fontSize: button.fontSize || 24,
                      }}>
                      {button.text}
                    </Text>
                  ) : (
                    <Icon
                      style={{color: button.color, fontSize: 24}}
                      name={button.icon}
                    />
                  )}
                </View>
              </TouchableNativeFeedback>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: '#3E5159',
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  title: {
    color: '#FCFFFF',
    fontSize: 24,
    fontWeight: 700,
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#3E5159',
    paddingHorizontal: 24,
  },
  displayCalc: {
    alignSelf: 'flex-end',
    color: '#FCFFFF',
    fontSize: 24,
  },
  displayResult: {
    alignSelf: 'flex-end',
    color: '#FCFFFF',
    fontSize: 64,
    fontWeight: 500,
    marginTop: -8,
  },
  keyboardContainer: {
    backgroundColor: '#161F26',
    padding: 24,
    gap: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  key: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 64,
    width: 64,
    borderRadius: 48,
  },
});

export default App;
