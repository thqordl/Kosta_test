import { useState } from "react";
import { Trash2, AlertCircle, CheckCircle, Calendar, User, Plus, ChevronLeft, ChevronRight, Package } from "lucide-react";

interface DisposalRecord {
  id: string;
  date: string;
  itemName: string;
  category: string;
  quantity: number;
  unit: string;
  reason: string;
  reasonDetail: string;
  handler: string;
  status: "completed";
}

const mockDisposalHistory: DisposalRecord[] = [
  {
    id: "d1",
    date: "2026-03-28 14:30",
    itemName: "소고기 패티",
    category: "육류",
    quantity: 10,
    unit: "개",
    reason: "유통기한 만료",
    reasonDetail: "유통기한 초과로 인한 폐기",
    handler: "김철수 (지점장)",
    status: "completed",
  },
  {
    id: "d2",
    date: "2026-03-27 11:20",
    itemName: "양상추",
    category: "채소",
    quantity: 3,
    unit: "kg",
    reason: "품질 불량",
    reasonDetail: "변색 및 신선도 저하",
    handler: "이영희 (매니저)",
    status: "completed",
  },
  {
    id: "d3",
    date: "2026-03-26 16:45",
    itemName: "생크림",
    category: "유제품",
    quantity: 2,
    unit: "L",
    reason: "유통기한 만료",
    reasonDetail: "유통기한 초과",
    handler: "김철수 (지점장)",
    status: "completed",
  },
  {
    id: "d4",
    date: "2026-03-25 10:15",
    itemName: "토마토",
    category: "채소",
    quantity: 5,
    unit: "kg",
    reason: "품질 불량",
    reasonDetail: "곰팡이 발생",
    handler: "박민수 (직원)",
    status: "completed",
  },
  {
    id: "d5",
    date: "2026-03-24 09:30",
    itemName: "버거빵",
    category: "빵류",
    quantity: 20,
    unit: "개",
    reason: "기타",
    reasonDetail: "배송 중 파손",
    handler: "이영희 (매니저)",
    status: "completed",
  },
];

const availableItems = [
  { id: "i1", name: "소고기 패티", category: "육류", unit: "개", stock: 45 },
  { id: "i2", name: "생크림", category: "유제품", unit: "L", stock: 12 },
  { id: "i3", name: "양상추", category: "채소", unit: "kg", stock: 8 },
  { id: "i4", name: "체다치즈", category: "유제품", unit: "장", stock: 30 },
  { id: "i5", name: "토마토", category: "채소", unit: "kg", stock: 15 },
  { id: "i6", name: "버거빵", category: "빵류", unit: "개", stock: 80 },
  { id: "i7", name: "감자", category: "채소", unit: "kg", stock: 15 },
  { id: "i8", name: "식용유", category: "조미료", unit: "L", stock: 5 },
];

const disposalReasons = [
  { value: "유통기한 만료", label: "유통기한 만료" },
  { value: "품질 불량", label: "품질 불량" },
  { value: "기타", label: "기타" },
];

export function InventoryDisposal() {
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [reasonDetail, setReasonDetail] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [disposalHistory, setDisposalHistory] =
    useState<DisposalRecord[]>(mockDisposalHistory);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const selectedItemData = availableItems.find((i) => i.id === selectedItem);

  const handleDisposal = () => {
    if (!selectedItem || !quantity || !reason) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    const qty = Number(quantity);
    if (qty <= 0 || qty > (selectedItemData?.stock || 0)) {
      alert("올바른 수량을 입력해주세요.");
      return;
    }

    setShowConfirmModal(true);
  };

  const confirmDisposal = () => {
    const newRecord: DisposalRecord = {
      id: `d${Date.now()}`,
      date: new Date().toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      itemName: selectedItemData!.name,
      category: selectedItemData!.category,
      quantity: Number(quantity),
      unit: selectedItemData!.unit,
      reason,
      reasonDetail: reasonDetail || reason,
      handler: "김철수 (지점장)", // 현재 로그인한 사용자
      status: "completed",
    };

    setDisposalHistory([newRecord, ...disposalHistory]);
    setShowConfirmModal(false);
    setShowFormModal(false);
    resetForm();
    alert("폐기 처리가 완료되었습니다.");
  };

  const resetForm = () => {
    setSelectedItem("");
    setQuantity("");
    setReason("");
    setReasonDetail("");
  };

  // Pagination
  const totalPages = Math.ceil(disposalHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecords = disposalHistory.slice(startIndex, endIndex);

  // Today's statistics
  const today = new Date().toISOString().split("T")[0];
  const todayRecords = disposalHistory.filter((r) => r.date.includes(today));
  const todayTotal = todayRecords.reduce((sum, r) => sum + r.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">재고 폐기 처리</h2>
          <p className="text-gray-500 mt-1">재고 폐기를 등록하고 이력을 관리하세요</p>
        </div>
        <button
          onClick={() => setShowFormModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          폐기 처리 등록
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">
                {todayRecords.length}건
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500">오늘 폐기</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">
                {todayTotal}개
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500">오늘 폐기 수량</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">
                {disposalHistory.length}건
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500">전체 폐기 이력</p>
        </div>
      </div>

      {/* Warning Box */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900 mb-1">주의사항</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• 폐기 처리된 재고는 복구할 수 없습니다.</li>
              <li>• 폐기 사유를 정확히 기재해주세요.</li>
              <li>• 폐기 이력은 감사 자료로 활용됩니다.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disposal History */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-lg text-gray-900">폐기 이력</h3>
          <p className="text-sm text-gray-500 mt-1">
            최근 폐기 처리 내역을 확인하세요
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  처리 일시
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  재료명
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  카테고리
                </th>
                <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                  폐기 수량
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  폐기 사유
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  처리자
                </th>
                <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">
                  상태
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {record.date}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {record.itemName}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{record.category}</td>
                  <td className="py-4 px-6 text-right font-semibold text-red-600">
                    {record.quantity}
                    {record.unit}
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <span className="font-medium text-gray-900">
                        {record.reason}
                      </span>
                      {record.reasonDetail && record.reasonDetail !== record.reason && (
                        <p className="text-sm text-gray-500 mt-1">
                          {record.reasonDetail}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      {record.handler}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      완료
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {disposalHistory.length > itemsPerPage && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              이전
            </button>
            <div className="text-sm text-gray-500">
              {currentPage} / {totalPages}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  폐기 처리 등록
                </h3>
                <p className="text-sm text-gray-500">
                  폐기할 재료와 사유를 입력하세요
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Item Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  재료 선택 <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedItem}
                  onChange={(e) => {
                    setSelectedItem(e.target.value);
                    setQuantity(""); // Reset quantity when item changes
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">재료를 선택하세요</option>
                  {availableItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.category}) - 현재 재고: {item.stock}
                      {item.unit}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  폐기 수량 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    disabled={!selectedItem}
                    min="1"
                    max={selectedItemData?.stock || 0}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="폐기할 수량을 입력하세요"
                  />
                  <div className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium min-w-[60px] flex items-center justify-center">
                    {selectedItemData?.unit || "단위"}
                  </div>
                </div>
                {selectedItemData && (
                  <p className="text-sm text-gray-500 mt-1">
                    현재 재고: {selectedItemData.stock}
                    {selectedItemData.unit}
                  </p>
                )}
              </div>

              {/* Reason Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  폐기 사유 <span className="text-red-500">*</span>
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">사유를 선택하세요</option>
                  {disposalReasons.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reason Detail */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  상세 사유 (선택)
                </label>
                <textarea
                  value={reasonDetail}
                  onChange={(e) => setReasonDetail(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="폐기 사유에 대한 상세 내용을 입력하세요"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowFormModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleDisposal}
                  disabled={!selectedItem || !quantity || !reason}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  폐기 처리
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && selectedItemData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  폐기 처리 확인
                </h3>
                <p className="text-sm text-gray-500">
                  아래 내용을 확인해주세요
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">재료명</span>
                <span className="text-sm font-semibold text-gray-900">
                  {selectedItemData.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">폐기 수량</span>
                <span className="text-sm font-semibold text-red-600">
                  {quantity}
                  {selectedItemData.unit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">폐기 사유</span>
                <span className="text-sm font-semibold text-gray-900">
                  {reason}
                </span>
              </div>
              {reasonDetail && (
                <div className="pt-2 border-t border-gray-200">
                  <span className="text-sm text-gray-600">상세 사유</span>
                  <p className="text-sm text-gray-900 mt-1">{reasonDetail}</p>
                </div>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-yellow-800">
                폐기 처리 후에는 복구할 수 없습니다. 계속하시겠습니까?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={confirmDisposal}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
