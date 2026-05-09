import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { QuoteFormValues } from '@/lib/schema';
import { BENEFIT_LIMITS } from '@/lib/constants';

const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 40, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, borderBottomWidth: 2, borderBottomColor: '#dc2626', paddingBottom: 15 },
  logo: { width: 120 }, 
  titleBlock: { alignItems: 'flex-end' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#dc2626' },
  subtitle: { fontSize: 10, color: '#4b5563', marginTop: 4 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#111827', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#e5e7eb', paddingBottom: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  rowAlt: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, backgroundColor: '#f9fafb' },
  label: { fontSize: 11, color: '#4b5563' },
  value: { fontSize: 11, fontWeight: 'bold', color: '#111827' },
  totalBox: { marginTop: 20, padding: 15, backgroundColor: '#fef2f2', borderRadius: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderLeftWidth: 4, borderLeftColor: '#dc2626' },
  totalLabel: { fontSize: 14, fontWeight: 'bold', color: '#991b1b' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#dc2626' },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', fontSize: 9, color: '#9ca3af' }
});

interface QuoteDocumentProps {
  data: QuoteFormValues;
  premiumTotal: number;
}

export default function QuoteDocument({ data, premiumTotal }: QuoteDocumentProps) {

  const safeCoverage = data.coverageType || "COMPREHENSIVE";
  const safeOption = data.benefitOption || "OPTION_1";

  const limits = BENEFIT_LIMITS[safeCoverage as keyof typeof BENEFIT_LIMITS][safeOption as "OPTION_1" | "OPTION_2" | "OPTION_3"];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER WITH LOGO */}
        <View style={styles.header}>
          <Image src="/cic-logo.png" style={styles.logo} />
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Coop Care Quotation</Text>
            <Text style={styles.subtitle}>Prepared for: {data.clientName || 'Valued Client'}</Text>
            <Text style={styles.subtitle}>Date: {new Date().toLocaleDateString()}</Text>
          </View>
        </View>
        
        {/* CONFIGURATION SUMMARY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Policy Configuration</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Coverage Type</Text>
            <Text style={styles.value}>{safeCoverage.replace('_', ' ')}</Text>
          </View>
          <View style={styles.rowAlt}>
            <Text style={styles.label}>Benefit Tier</Text>
            <Text style={styles.value}>{safeOption.replace('_', ' ')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Family Size</Text>
            <Text style={styles.value}>Principal + {data.dependentCount || 0} Dependents</Text>
          </View>
        </View>

        {/* BENEFIT LIMITS BREAKDOWN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benefit Limits Breakdown</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Inpatient Limit</Text>
            <Text style={styles.value}>KES {limits.inpatient}</Text>
          </View>
          <View style={styles.rowAlt}>
            <Text style={styles.label}>Outpatient Limit</Text>
            <Text style={styles.value}>{limits.outpatient !== "N/A" ? `KES ${limits.outpatient}` : "Not Covered"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Maternity Limit</Text>
            <Text style={styles.value}>{limits.maternity !== "N/A" ? `KES ${limits.maternity}` : "Not Covered"}</Text>
          </View>
          <View style={styles.rowAlt}>
            <Text style={styles.label}>Dental Limit</Text>
            <Text style={styles.value}>{limits.dental !== "N/A" ? `KES ${limits.dental}` : "Not Covered"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Optical Limit</Text>
            <Text style={styles.value}>{limits.optical !== "N/A" ? `KES ${limits.optical}` : "Not Covered"}</Text>
          </View>
          <View style={styles.rowAlt}>
            <Text style={styles.label}>Last Expense</Text>
            <Text style={styles.value}>KES {limits.lastExpense}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Accommodation</Text>
            <Text style={styles.value}>{limits.accommodation}</Text>
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
          Final premiums are subject to formal underwriting approval.
        </Text>

      </Page>
    </Document>
  );
}