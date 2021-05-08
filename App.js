import React, {Component} from 'react';
import Params from './src/Params';
import {
  SafeAreaView,
  Platform,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import MineField from './src/components/MineField';
import {
  createMinedBoard,
  openField,
  hadExplosion,
  wonGame,
  showMInes,
  cloneBoard
} from './src/Functions';
import params from './src/Params';



export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = params.getCollumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getCollumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false 
    }
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if (lost) {
      showMInes(board)
      Alert.alert('Perdeeeeeeu!', 'Ieeeeeiiiiiii!!!')
    }

    if(won) {
      Alert.alert('Parabéns', 'Você Venceu!!')
    }

    this.setState({ board, row, column })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.estilo}>
          Inicnaindo o Mines!!!!
        </Text>
        <Text style={styles.estilo}>
          Tamanho da grade: {Params.getRowsAmount()}x{Params.getCollumnsAmount()}
        </Text>
        <View style={styles.board}>
          <MineField board={this.state.board} 
            onOpenField={this.onOpenField}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  } ,
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  }
})

