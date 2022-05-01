import React from 'react'
import {
  Document,
  Page,
  Text,
  StyleSheet,
} from '@react-pdf/renderer'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell
} from '@david.kucsai/react-pdf-table'

const InvoicePDF = ({ order }) => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.header} fixed >Downloaded On: {new Date().toLocaleString()}</Text>
        <Text style={styles.title} > Order Invoice </Text>
        <Text style={styles.author} > MERN Ecommerce </Text>
        <Text style={styles.subtitle} > Order Summary </Text>
        <Table>
          <TableHeader>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Color</TableCell>
          </TableHeader>
        </Table>
        <Table data={order.products} >
          <TableBody className='text-center'>
            <DataTableCell getContent={(x) => x.product.title} />
            <DataTableCell getContent={(x) => `Rs ${x.product.price}`} />
            <DataTableCell getContent={(x) => x.count} />
            <DataTableCell getContent={(x) => x.product.brand} />
            <DataTableCell getContent={(x) => x.color} />
          </TableBody>
        </Table>
        <Text style={styles.text} >
          <Text>
            Order Purchased On:
            {' '}
            {new Date(order.paymentIntent.created * 1000).toLocaleString()}
          </Text>
          {"\n"}
          <Text>
            Order ID:
            {"                   "}
            {order._id}
          </Text>
          {"\n"}
          <Text>
            Payment ID:
            {"              "}
            {order.paymentIntent.id}
          </Text>
          {"\n"}
          <Text>
            Order Status:
            {"            "}
            {order.orderStatus}
          </Text>
          {"\n"}
          <Text>
            Total Amount Paid:
            {"   "}
            {`Rs ${order.paymentIntent.amount / 100}`}
          </Text>
          {"\n"}
        </Text>
        <Text style={styles.footer}> Thank You for shopping with us.</Text>
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default InvoicePDF