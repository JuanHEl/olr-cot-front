import React from 'react'
import {Document, Page, Text, View} from '@react-pdf/renderer'

export const DocuPdf = () => {
  return (
    <Document>
        <Page size="A4">
            <View
            style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            }} 
            >
                <Text>Hola</Text>
                <div>DocuPdf</div>
            </View>
        </Page>
    </Document>
  )
}
