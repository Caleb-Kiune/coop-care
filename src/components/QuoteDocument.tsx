import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { RosterMember } from '@/lib/schema';
import { PremiumBreakdown } from '@/lib/pricing';

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
  memberBox: { marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  memberName: { fontSize: 12, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  memberDetails: { fontSize: 10, color: '#4b5563' },
  memberPremium: { fontSize: 12, fontWeight: 'bold', color: '#dc2626' },
  totalBox: { marginTop: 20, padding: 15, backgroundColor: '#fef2f2', borderRadius: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderLeftWidth: 4, borderLeftColor: '#dc2626' },
  totalLabel: { fontSize: 14, fontWeight: 'bold', color: '#991b1b' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#dc2626' },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', fontSize: 9, color: '#9ca3af' }
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
        
        {/* ROSTER SUMMARY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Group Roster ({roster.length} Members)</Text>
          {roster.map((member, idx) => (
            <View key={member.id} style={styles.memberBox}>
              <View>
                <Text style={styles.memberName}>{member.clientName || `Member ${idx + 1}`}</Text>
                <Text style={styles.memberDetails}>
                  Coverage: {member.coverageType?.replace('_', ' ')} | Tier: {member.benefitOption?.replace('_', ' ')} | Dependents: {member.dependentCount}
                </Text>
              </View>
              <Text style={styles.memberPremium}>
                KES {member.basePremium?.toLocaleString() ?? "0"}
              </Text>
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