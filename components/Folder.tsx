import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Icon } from 'react-native-elements'
import { DocumentationNavigatorProps } from '../navigation/types';

const Folder =({ navigation }: DocumentationNavigatorProps<'ListFolderDocumentation'>)=>{
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ListDocumentation')}> 
            <Icon name='folder' size={50}></Icon>
            <Text style={styles.namefolder}>OODA</Text>
        </TouchableOpacity>
    );
};
export default Folder;
const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingHorizontal:10,
        paddingVertical:10,
        marginBottom: 5,
        shadowColor: '#000',
        elevation: 1,
    },
    namefolder:{
        fontSize:18, 
        fontWeight:'bold',
        paddingTop: 15,
        marginLeft:10
    }
});