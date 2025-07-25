useEffect(() => {
  const fetchOrders = async () => {
    const qBuyer = query(collection(db, "orders"), where("buyerId", "==", user.uid));
    const qSeller = query(collection(db, "orders"), where("sellerId", "==", user.uid));

    const buyerSnap = await getDocs(qBuyer);
    const sellerSnap = await getDocs(qSeller);

    setBuyerOrders(buyerSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setSellerOrders(sellerSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleStatusUpdate = async (id, status) => {
  await updateDoc(doc(db, "orders", id), { status });
};

<Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
})
export default fetchOrders;