import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { QuoteFormValues } from '@/lib/schema';

// 1. Define strict PDF styles 
const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 40, fontFamily: 'Helvetica' },
  header: { marginBottom: 30, borderBottomWidth: 2, borderBottomColor: '#dc2626', paddingBottom: 15 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#dc2626' },
  subtitle: { fontSize: 12, color: '#4b5563', marginTop: 8 },
  section: { marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#e5e7eb', paddingVertical: 10 },
  label: { fontSize: 12, color: '#6b7280' },
  value: { fontSize: 12, fontWeight: 'bold', color: '#111827' },
  totalBox: { marginTop: 30, padding: 20, backgroundColor: '#fef2f2', borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#991b1b' },
  totalValue: { fontSize: 20, fontWeight: 'bold', color: '#dc2626' },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', fontSize: 10, color: '#9ca3af' }
});

interface QuoteDocumentProps {
  data: QuoteFormValues;
  premiumTotal: number;
}

// 2. The Document Layout
export default function QuoteDocument({ data, premiumTotal }: QuoteDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Coop Care Medical Quotation</Text>
          <Text style={styles.subtitle}>Prepared for: {data.clientName || 'Valued Client'}</Text>
        </View>
        
        {/* CONFIGURATION SUMMARY */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Coverage Type</Text>
            <Text style={styles.value}>{data.coverageType.replace('_', ' ')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Benefit Tier</Text>
            <Text style={styles.value}>{data.benefitOption.replace('_', ' ')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Family Size</Text>
            <Text style={styles.value}>Principal + {data.dependentCount} Dependents</Text>
          </View>
        </View>

        {/* THE BOTTOM LINE */}
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total Annual Premium</Text>
          <Text style={styles.totalValue}>KES {premiumTotal.toLocaleString()}</Text>
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>
          This is a system-generated quotation based on current CIC Microinsurance rates. 
          Final premiums are subject to underwriting approval.
        </Text>

      </Page>
    </Document>
  );
}