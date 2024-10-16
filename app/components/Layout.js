import Sidebar from './Sidebar';

export default function Layout({ children }) {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            
            {/* Main content */}
            <div className="flex-1 overflow-hidden">
                {/* Page content */}
                <main className="ml-64 p-6 bg-gray-100 min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
}
