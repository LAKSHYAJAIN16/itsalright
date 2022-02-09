// Registers Sub-Proccess for App on IOS
import sub
import low

//Custom Cache functions
func cache_static(context, n){
    regCache(context.s.static);
    filter(context.s.static);
    cAssign(context.s.static, n);
}

func cache_dynamic(context){
    regCache(context.cache.__BYTES__);
    filter(contex.cache.__BYTES__);

    var c_buf = context.cache.c_buf;
    c_buf.format();
    c_buf.regSubProcess();

    var bytes = openByteArray(c_buf.regularized);
    bytes.register(true, bytes);
    bytes.filter(true, "normalized", "v8");

    //CACHE STATIC
    var n = 80;
    cache_static(context, n);
}

func reg(context){
    sub.register(context, "itsalright");
    cache_dynamic();
}