import React from 'react';
import { View,Text,StyleSheet, TouchableOpacity } from 'react-native';

function ResourcesScreen({navigation}){
    return(
        <View style={styles.container}>
            
            <Text style={{fontSize:20,paddingTop:10, fontWeight:'bold',paddingLeft:75}}>Skin Infections and Treatment</Text>
            <View style={styles.button}>
                
                <TouchableOpacity style={[styles.btn,{borderColor:'#245e46', borderWidth:1,marginTop:15}]}
                onPress={()=>navigation.navigate('Introduction')}>
                    <Text style={{fontSize:16, fontWeight:'bold',color:'#130C52'}}>Introduction to Dermatology</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.btn,{borderColor:'#245e46', borderWidth:1,marginTop:15}]}
                 onPress={()=>navigation.navigate('History1')}>
                    <Text style={{fontSize:16, fontWeight:'bold',color:'#130C52'}}>History Taking 1</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.btn,{borderColor:'#245e46', borderWidth:1,marginTop:15}]}
                 onPress={()=>navigation.navigate('History2')}>
                    <Text style={{fontSize:16, fontWeight:'bold',color:'#130C52'}}>History Taking 2</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.btn,{borderColor:'#245e46', borderWidth:1,marginTop:15}]}
                 onPress={()=>navigation.navigate('Acne')}>
                    <Text style={{fontSize:16, fontWeight:'bold',color:'#130C52'}}>Acne</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.btn,{borderColor:'#245e46', borderWidth:1,marginTop:15}]}
                 onPress={()=>navigation.navigate('Eczema')}>
                    <Text style={{fontSize:16, fontWeight:'bold',color:'#130C52'}}>Eczema</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.btn,{borderColor:'#245e46', borderWidth:1,marginTop:15}]}
                 onPress={()=>navigation.navigate('Psoriasis')}>
                    <Text style={{fontSize:16, fontWeight:'bold',color:'#130C52'}}>Psoriasis</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.btn,{borderColor:'#245e46', borderWidth:1,marginTop:15}]}
                 onPress={()=>navigation.navigate('NailFungus')}>
                    <Text style={{fontSize:16, fontWeight:'bold',color:'#130C52'}}>Nail Fungus</Text>
                </TouchableOpacity>
            </View>            
            <View>
                <Text style={{fontSize:20,fontWeight:'bold',paddingLeft:150}}>Videos</Text>
                <View style={styles.button}>
                    <TouchableOpacity style={[styles.btn,{borderColor:'#245e46', borderWidth:1,marginTop:15}]}>
                        <Text style={{fontSize:16, fontWeight:'bold',color:'#130C52'}}>Videos</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View>
                <Text style={{fontSize:20,fontWeight:'bold',paddingLeft:120}}>Skin Care Tips</Text>
                <View style={styles.button}>
                    <TouchableOpacity style={[styles.btn,{borderColor:'#245e46', borderWidth:1,marginTop:15}]}
                    onPress={()=>navigation.navigate('Tips')}>
                        <Text style={{fontSize:16, fontWeight:'bold',color:'#130C52'}}>Tips</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ResourcesScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    button: {
        alignItems: 'flex-start',
        marginTop: 5,
        paddingLeft:20,

    },
    btn: {
        width: '95%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    }
  });