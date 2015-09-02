/*
 * 按指定的时间间隔，顺序执行Promise队列, 主要为了解决千牛客户端加载列表数据时页面卡死的问题
 * @author 算沙
 */
define([
    "lodash",
    "./services"
], function(_, services){
    "use strict";

    return services.factory("PromiseQueue", ["$timeout", function($timeout){

        function PromiseQueue(){
            this._queue   = [];
            this._stop    = true;

            this._before  = null;
            this._after   = null;
        }

        function _exec(interval){
            var self = this;
            var next = self._queue.shift();
            if(!self._stop && next){
                next().finally(function(){
                    $timeout(function(){
                        _exec.call(self, interval);
                    }, interval);
                });
            }else{
                self._stop = true;
                if(self._after){
                    self._after();
                }
            }
        }

        _.extend(PromiseQueue.prototype, {
            /*
             *  启动队列执行
             */
            exec: function(interval){
                this._stop = false;
                if(this._before){
                    this._before();
                }
                _exec.call(this, interval || 0);
                return this;
            },

            /* 从队列前面入队
             * @param fn: function，返回promise对象
             */
            unshift: function(fn){
                this._queue.unshift(fn);
                return this;
            },
            /* 从队列尾部入队
             * @param fn: function，返回promise对象
             */
            push: function(fn){
                this._queue.push(fn);
                return this;
            },
            /*
             *  终止队列执行
             */
            abort: function(){
                this._stop = true;
                return this;
            },
            /*
             *  清除队列
             */
            clear: function(){
                this._queue = [];
                return this;
            },
            /*
             *  设置队列执行之前的回调
             */
            before: function(fn){
                this._before = fn;
                return this;
            },
            /*
             *  设置队列执行之后的回调
             */
            after: function(fn){
                this._after = fn;
                return this;
            }
        });

        return PromiseQueue;
    }]);
});
