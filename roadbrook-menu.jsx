import React, { useState } from 'react';
import { Settings, Volume2, Save, X, Plus, Trash2 } from 'lucide-react';

export default function RoadbrookMenu() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [cafeName, setCafeName] = useState('로드브로크');
  const [editingCafeName, setEditingCafeName] = useState('');
  
  const [menuItems, setMenuItems] = useState([
    // COFFEE
    { id: 1, category: 'COFFEE', name: 'HOT A(에스프레소)', price: '6,000원', description: '깊고 진한 싱글 오리진 에스프레소' },
    { id: 2, category: 'COFFEE', name: 'ICE A(에스프레소)', price: '6,000원', description: '시원한 싱글 오리진 아이스 에스프레소' },
    { id: 3, category: 'COFFEE', name: 'HOT A(프루티 봉봉)', price: '6,000원', description: '과일향이 풍부한 에스프레소' },
    { id: 4, category: 'COFFEE', name: 'ICE A(프루티 봉봉)', price: '6,000원', description: '상큼한 과일향의 아이스 에스프레소' },
    { id: 5, category: 'COFFEE', name: 'HOT L(에스프레소)', price: '6,000원', description: '부드러운 우유와 에스프레소의 조화' },
    { id: 6, category: 'COFFEE', name: 'ICE L(에스프레소)', price: '6,000원', description: '시원한 아이스 카페 라떼' },
    { id: 7, category: 'COFFEE', name: 'HOT L(프루티 봉봉)', price: '6,000원', description: '과일향 에스프레소와 우유의 조화' },
    { id: 8, category: 'COFFEE', name: 'ICE L(프루티 봉봉)', price: '6,000원', description: '상큼한 과일향 아이스 라떼' },
    { id: 9, category: 'COFFEE', name: 'HOT F(에스프레소)', price: '6,000원', description: '진한 에스프레소와 폼밀크의 조화' },
    { id: 10, category: 'COFFEE', name: 'ICE F(에스프레소)', price: '6,000원', description: '시원한 플랫화이트' },
    { id: 11, category: 'COFFEE', name: 'HOT F(프루티 봉봉)', price: '6,000원', description: '과일향 플랫화이트' },
    { id: 12, category: 'COFFEE', name: 'ICE F(프루티 봉봉)', price: '6,000원', description: '상큼한 아이스 플랫화이트' },
    { id: 13, category: 'COFFEE', name: 'HOT VL', price: '6,500원', description: '달콤한 바닐라 라떼' },
    { id: 14, category: 'COFFEE', name: 'ICE VL', price: '6,500원', description: '시원한 바닐라 라떼' },
    
    // FILTER COFFEE
    { id: 15, category: 'FILTER COFFEE', name: 'H Batch Brew', price: '6,000원', description: '따뜻한 배치 브루 커피' },
    { id: 16, category: 'FILTER COFFEE', name: 'I Batch Brew', price: '6,000원', description: '시원한 배치 브루 커피' },
    { id: 17, category: 'FILTER COFFEE', name: 'H decaf coffee', price: '7,000원', description: '카페인 없는 따뜻한 커피' },
    { id: 18, category: 'FILTER COFFEE', name: 'I decaf coffee', price: '7,000원', description: '카페인 없는 시원한 커피' },
    
    // NON COFFEE
    { id: 19, category: 'NON COFFEE', name: 'HOT TEA', price: '6,000원', description: '따뜻한 차' },
    { id: 20, category: 'NON COFFEE', name: 'ICE TEA', price: '6,000원', description: '시원한 아이스티' },
    
    // MD
    { id: 21, category: 'MD', name: '드립백', price: '11,000원', description: '집에서 즐기는 로드브로크 커피' }
  ]);

  const [editingItems, setEditingItems] = useState([]);

  const ADMIN_PASSWORD = '1234';

  const handlePasswordSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      setIsEditMode(true);
      setShowPasswordModal(false);
      setPassword('');
      setEditingItems(JSON.parse(JSON.stringify(menuItems)));
      setEditingCafeName(cafeName);
    } else {
      alert('비밀번호가 올바르지 않습니다.');
      setPassword('');
    }
  };

  const handleSaveChanges = () => {
    setMenuItems(editingItems);
    setCafeName(editingCafeName);
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditingItems([]);
    setEditingCafeName('');
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      category: 'COFFEE',
      name: '새 메뉴',
      price: '0원',
      description: '메뉴 설명을 입력하세요.'
    };
    setEditingItems([...editingItems, newItem]);
  };

  const handleDeleteItem = (id) => {
    setEditingItems(editingItems.filter(item => item.id !== id));
  };

  const handleEditItem = (id, field, value) => {
    setEditingItems(editingItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('이 브라우저는 음성 읽기 기능을 지원하지 않습니다.');
    }
  };

  const groupedMenus = isEditMode 
    ? editingItems.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
      }, {})
    : menuItems.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
      }, {});

  // 카테고리 순서 정의
  const categoryOrder = ['COFFEE', 'FILTER COFFEE', 'NON COFFEE', 'MD'];
  const sortedCategories = categoryOrder.filter(cat => groupedMenus[cat]);

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* 로드브로크 로고 */}
            <img 
              src="https://raw.githubusercontent.com/YOUR-USERNAME/YOUR-REPO/main/logo.jpg" 
              alt="로드브로크 로고" 
              className="h-12 w-auto"
              onError={(e) => {
                // 이미지 로드 실패 시 대체 텍스트 표시
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div style={{ display: 'none', padding: '8px 16px', background: '#000', color: '#fff', borderRadius: '4px' }}>
              ROADBROOK
            </div>
            {isEditMode ? (
              <input
                type="text"
                value={editingCafeName}
                onChange={(e) => setEditingCafeName(e.target.value)}
                className="text-2xl font-bold text-gray-800 border-b-2 border-gray-800 focus:outline-none ml-4"
              />
            ) : (
              <h1 className="text-2xl font-bold text-gray-800 ml-4">{cafeName}</h1>
            )}
          </div>
          
          {!isEditMode ? (
            <button
              onClick={() => setShowPasswordModal(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>저장</span>
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>취소</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 메뉴 목록 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {sortedCategories.map((category) => (
          <div key={category} className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-900">
              {category} {groupedMenus[category].length}
            </h2>
            <div className="space-y-3">
              {groupedMenus[category].map((item) => (
                <div key={item.id} className="bg-white border-b border-gray-200 pb-4 hover:bg-gray-50 transition-colors">
                  {isEditMode ? (
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={item.category}
                              onChange={(e) => handleEditItem(item.id, 'category', e.target.value)}
                              placeholder="카테고리"
                              className="px-2 py-1 border rounded w-32 text-sm"
                            />
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => handleEditItem(item.id, 'name', e.target.value)}
                              placeholder="메뉴명"
                              className="px-2 py-1 border rounded flex-1 font-semibold"
                            />
                            <input
                              type="text"
                              value={item.price}
                              onChange={(e) => handleEditItem(item.id, 'price', e.target.value)}
                              placeholder="가격"
                              className="px-2 py-1 border rounded w-24"
                            />
                          </div>
                          <textarea
                            value={item.description}
                            onChange={(e) => handleEditItem(item.id, 'description', e.target.value)}
                            placeholder="메뉴 설명"
                            className="w-full px-2 py-1 border rounded text-sm"
                            rows="2"
                          />
                        </div>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="ml-2 p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between mb-1">
                          <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                          <span className="text-base font-semibold text-gray-900 ml-4">{item.price}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <p className="text-gray-600 text-sm flex-1 leading-relaxed">{item.description}</p>
                          <button
                            onClick={() => speakText(item.description)}
                            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                            title="음성으로 듣기"
                          >
                            <Volume2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {isEditMode && (
          <button
            onClick={handleAddItem}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-800 hover:text-gray-800 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>메뉴 추가</span>
          </button>
        )}
      </main>

      {/* 비밀번호 모달 */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">관리자 인증</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              placeholder="비밀번호를 입력하세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-800"
              autoFocus
            />
            <div className="flex space-x-2">
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                확인
              </button>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPassword('');
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                취소
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4">기본 비밀번호: 1234</p>
          </div>
        </div>
      )}

      {/* 푸터 */}
      <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-500 text-sm border-t">
        <p>QR 코드로 메뉴를 확인하세요</p>
        <p className="mt-2 text-xs">ROADBROOK COFFEE</p>
      </footer>
    </div>
  );
}