import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { RosterMember } from '@/lib/schema';
import { PremiumBreakdown } from '@/lib/pricing';
import { formatMemberPlan, formatDependents } from '@/lib/formatters';

const CIC = {
  red: '#AC1F2D',
  redDark: '#8A1924',
  redLight: '#FEF2F2',
  text: '#111111',
  gray600: '#4b5563',
  gray400: '#9ca3af',
  gray200: '#e5e7eb',
  gray100: '#f3f4f6',
  gray50: '#f9fafb',
};

const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 40, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, borderBottomWidth: 2, borderBottomColor: CIC.red, paddingBottom: 15 },
  logo: { width: 120 },
  titleBlock: { alignItems: 'flex-end' },
  title: { fontSize: 20, fontWeight: 'bold', color: CIC.red },
  subtitle: { fontSize: 10, color: CIC.gray600, marginTop: 4 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: CIC.text, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: CIC.gray200, paddingBottom: 4 },
  // Table styles for WYSIWYG parity
  tableHeader: { flexDirection: 'row', backgroundColor: CIC.gray100, paddingVertical: 6, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: CIC.gray200 },
  tableHeaderCell: { fontSize: 8, fontWeight: 'bold', color: CIC.gray600, textTransform: 'uppercase' },
  tableRow: { flexDirection: 'row', paddingVertical: 6, paddingHorizontal: 8, backgroundColor: '#FFFFFF' },
  tableRowAlt: { flexDirection: 'row', paddingVertical: 6, paddingHorizontal: 8, backgroundColor: CIC.gray50 },
  cellIndex: { width: '6%', fontSize: 9, color: CIC.gray400 },
  cellName: { width: '30%', fontSize: 9, fontWeight: 'bold', color: CIC.text },
  cellPlan: { width: '24%', fontSize: 9, color: CIC.gray600 },
  cellDeps: { width: '10%', fontSize: 9, color: CIC.gray600, textAlign: 'center' },
  cellPremium: { width: '30%', fontSize: 9, fontWeight: 'bold', color: CIC.red, textAlign: 'right' },
  // Breakdown rows
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  rowAlt: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, backgroundColor: CIC.gray50 },
  label: { fontSize: 11, color: CIC.gray600 },
  value: { fontSize: 11, fontWeight: 'bold', color: CIC.text },
  // Total
  totalBox: { marginTop: 20, padding: 15, backgroundColor: CIC.redLight, borderRadius: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderLeftWidth: 4, borderLeftColor: CIC.red },
  totalLabel: { fontSize: 14, fontWeight: 'bold', color: CIC.redDark },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: CIC.red },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', fontSize: 9, color: CIC.gray400 }
});

interface QuoteDocumentProps {
  roster: RosterMember[];
  premiumBreakdown: PremiumBreakdown | null;
}

export default function QuoteDocument({ roster, premiumBreakdown }: QuoteDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER WITH LOGO */}
        <View style={styles.header}>
          <Image src="/cic-logo.png" style={styles.logo} />
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Coop Care Group Quotation</Text>
            <Text style={styles.subtitle}>Prepared on: {new Date().toLocaleDateString()}</Text>
          </View>
        </View>
        
        {/* ROSTER TABLE — mirrors GroupQuoteDrawer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Group Roster ({roster.length} Members)</Text>
          
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.cellIndex]}>#</Text>
            <Text style={[styles.tableHeaderCell, styles.cellName]}>Name</Text>
            <Text style={[styles.tableHeaderCell, styles.cellPlan]}>Plan</Text>
            <Text style={[styles.tableHeaderCell, styles.cellDeps]}>Deps</Text>
            <Text style={[styles.tableHeaderCell, styles.cellPremium]}>Premium</Text>
          </View>

          {/* Table Body with zebra-striping */}
          {roster.map((member, idx) => (
            <View key={member.id} style={idx % 2 === 1 ? styles.tableRowAlt : styles.tableRow}>
              <Text style={styles.cellIndex}>{idx + 1}</Text>
              <Text style={styles.cellName}>{member.clientName || `Member ${idx + 1}`}</Text>
              <Text style={styles.cellPlan}>{formatMemberPlan(member.coverageType!, member.benefitOption!)}</Text>
              <Text style={styles.cellDeps}>{formatDependents(member.dependentCount)}</Text>
              <Text style={styles.cellPremium}>KES {member.basePremium?.toLocaleString() ?? "0"}</Text>
            </View>
          ))}
        </View>

        {/* PREMIUM BREAKDOWN */}
        {premiumBreakdown && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Aggregate Premium Breakdown</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Total Base Premium</Text>
              <Text style={styles.value}>KES {premiumBreakdown.basePremium.toLocaleString()}</Text>
            </View>
            <View style={styles.rowAlt}>
              <Text style={styles.label}>Training Levy (0.2%)</Text>
              <Text style={styles.value}>KES {premiumBreakdown.trainingLevy.toLocaleString()}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>PHCF (0.25%)</Text>
              <Text style={styles.value}>KES {premiumBreakdown.phcf.toLocaleString()}</Text>
            </View>
            <View style={styles.rowAlt}>
              <Text style={styles.label}>Stamp Duty</Text>
              <Text style={styles.value}>KES {premiumBreakdown.stampDuty.toLocaleString()}</Text>
            </View>
          </View>
        )}

        {/* THE BOTTOM LINE */}
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total Group Annual Premium</Text>
          <Text style={styles.totalValue}>KES {premiumBreakdown?.totalPremium.toLocaleString() ?? "0"}</Text>
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>
          This is a system-generated quotation based on current CIC Microinsurance rates. 
          Final premiums are subject to formal underwriting approval. Group policies require a minimum of 4 members to activate.
        </Text>

      </Page>
    </Document>
  );
}